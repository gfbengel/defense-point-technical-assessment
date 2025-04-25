
import { FindManyRecipesOptions, FindManyRecipesResponse, RecipesRepository } from "@/domain/repositories/recipes.repository";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "../drizzle.service";
import { DrizzleRecipeWithIngredientsMapper } from "../mappers/drizzle-recipe-with-ingredients.mapper";
import { and, eq, asc, desc, inArray, ilike, isNull, sql, count, not } from "drizzle-orm";
import { dbSchema } from "drizzle/schema";
import { DrizzleRecipeWithDetailsMapper } from "../mappers/drizzle-recipe-with-details.mapper";
import { RecipeWithDetails } from "@/domain/entities/value-objects/recipe-with-details";
import { Recipe } from "@/domain/entities/recipe";
import { DrizzleRecipeMapper } from "../mappers/drizzle-recipe.mapper";


@Injectable()
export class DrizzleRecipesRepository implements RecipesRepository {
  constructor(private readonly drizzle: DrizzleService) { }
  async save(recipe: Recipe): Promise<void> {
    const dto = DrizzleRecipeMapper.toDrizzle(recipe)

    await this.drizzle.db.update(dbSchema.recipes).set(dto).where(eq(dbSchema.recipes.id, recipe.id.toString()))
  }

  async findById(id: string): Promise<Recipe | null> {
    const recipe = await this.drizzle.db.query.recipes.findFirst({
      where: (recipes, { and, eq, isNull }) => and(eq(recipes.id, id), isNull(recipes.deletedAt))
    })

    if (!recipe) {
      return null
    }

    return DrizzleRecipeMapper.toDomain(recipe)
  }

  async toggleFavoriteStatus(id: string): Promise<void> {
    await this.drizzle.db.update(dbSchema.recipes).set({
      isFavorite: not(dbSchema.recipes.isFavorite)
    }).where(eq(dbSchema.recipes.id, id))

  }

  async findDetailedById(id: string): Promise<RecipeWithDetails | null> {

    const recipe = await this.drizzle.db.query.recipes.findFirst({
      where: (recipes, { and, eq, isNull }) => and(eq(recipes.id, id), isNull(recipes.deletedAt))
    })

    if (!recipe) {
      return null
    }

    const recipeIngredients = await this.drizzle.db
      .select({
        id: dbSchema.recipeIngredients.id,
        recipeId: dbSchema.recipeIngredients.recipeId,
        ingredientId: dbSchema.recipeIngredients.ingredientId,
        quantity: dbSchema.recipeIngredients.quantity,
        unit: dbSchema.recipeIngredients.unit,
        name: sql<string>`${dbSchema.ingredients.name}`.as('name'),
        createdAt: dbSchema.recipeIngredients.createdAt,
        updatedAt: dbSchema.recipeIngredients.updatedAt,
        deletedAt: dbSchema.recipeIngredients.deletedAt,
      })
      .from(dbSchema.recipeIngredients)
      .leftJoin(dbSchema.ingredients, eq(dbSchema.recipeIngredients.ingredientId, dbSchema.ingredients.id))
      .where(and(eq(dbSchema.recipeIngredients.recipeId, id), isNull(dbSchema.recipeIngredients.deletedAt)))

    return DrizzleRecipeWithDetailsMapper.toDomain({ ...recipe, ingredients: recipeIngredients })
  }

  async findMany(options: FindManyRecipesOptions): Promise<FindManyRecipesResponse> {

    const { page, pageSize, filters, sortBy } = options


    const [sortColumn, sortDirection] = sortBy ? sortBy.split('.') : ['title', 'asc']

    const orderByFn = (sortDirection === 'asc' ? asc : desc)(dbSchema.recipes[sortColumn])

    const whereClauses = [
      isNull(dbSchema.recipes.deletedAt)
    ]


    const ingredientsDetails = this.drizzle.db.$with('ingredients_details').as(
      this.drizzle.db
        .select({
          recipeId: dbSchema.recipeIngredients.recipeId,
          id: dbSchema.ingredients.id,
          name: dbSchema.ingredients.name,
        })
        .from(dbSchema.recipeIngredients)
        .leftJoin(dbSchema.ingredients, eq(dbSchema.recipeIngredients.ingredientId, dbSchema.ingredients.id))
        .where(and(
          isNull(dbSchema.recipeIngredients.deletedAt),
          isNull(dbSchema.ingredients.deletedAt)
        ))
        .orderBy(asc(dbSchema.ingredients.name))
    )


    const ingredientsFilter = this.drizzle.db.$with('ingredients_filter').as(
      this.drizzle.db
        .select({
          recipe_id: dbSchema.recipeIngredients.recipeId,
        })
        .from(dbSchema.recipeIngredients)
        .where(and(
          inArray(dbSchema.recipeIngredients.ingredientId, filters?.ingredientIds ?? []),
          isNull(dbSchema.recipeIngredients.deletedAt)
        ))
        .groupBy(dbSchema.recipeIngredients.recipeId)
    )

    if (filters) {

      if (filters.title) {
        whereClauses.push(ilike(dbSchema.recipes.title, `%${filters.title}%`))
      }

      if (filters.ingredientIds && filters.ingredientIds.length > 0) {

        whereClauses.push(
          sql`EXISTS (
            SELECT 1
            FROM ingredients_filter
            WHERE ingredients_filter.recipe_id = ${dbSchema.recipes.id}
          )`
        )
      }
    }

    const countResult = await this.drizzle.db
      .with(ingredientsFilter)
      .select({
        count: count()
      })
      .from(dbSchema.recipes)
      .where(and(...whereClauses))

    const totalRowsCount = Number(countResult[0].count)



    const fieldsToSelect = {
      id: dbSchema.recipes.id,
      title: dbSchema.recipes.title,
      description: dbSchema.recipes.description,
      timeToCookInMinutes: dbSchema.recipes.timeToCookInMinutes,
      isFavorite: dbSchema.recipes.isFavorite,
      image: dbSchema.recipes.image,
      ingredients: sql<{ id: string, name: string }[]>`COALESCE(
        json_agg(ingredients_details) FILTER (WHERE ingredients_details.id IS NOT NULL),
        '[]'::json
      )`
    }


    const recipes = await this.drizzle.db
      .with(ingredientsDetails, ingredientsFilter)
      .select(fieldsToSelect)
      .from(dbSchema.recipes)
      .leftJoin(ingredientsDetails, eq(dbSchema.recipes.id, ingredientsDetails.recipeId))
      .where(and(...whereClauses))
      .groupBy(dbSchema.recipes.id)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .orderBy(orderByFn)

    return {
      items: recipes.map(recipe => DrizzleRecipeWithIngredientsMapper.toDomain(recipe)),
      totalRowsCount
    }
  }

}


