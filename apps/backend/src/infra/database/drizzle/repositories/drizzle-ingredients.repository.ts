import { Ingredient } from "@/domain/entities/ingredient";
import { FindManyIngredientsOptions, FindManyIngredientsResponse, IngredientsRepository } from "@/domain/repositories/ingredients.repository";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "../drizzle.service";
import { and, count, countDistinct, eq, ilike, sql } from "drizzle-orm";
import { DrizzleIngredientMapper } from "../mappers/drizzle-ingredient.mapper";
import { lower } from "drizzle/helpers/lower";
import { asc, desc, isNull } from "drizzle-orm";
import { dbSchema } from "drizzle/schema";
import { DrizzleIngredientWithRecipeCountMapper } from "../mappers/drizzle-ingredient-with-recipe-count.mapper";
import { IngredientWithRecipeCount } from "@/domain/entities/value-objects/ingredient-with-recipe-count";

@Injectable()
export class DrizzleIngredientsRepository implements IngredientsRepository {
  constructor(private readonly drizzle: DrizzleService) { }


  async findById(id: string): Promise<Ingredient | null> {

    const ingredient = await this.drizzle.db.query.ingredients.findFirst({
      where: (ingredients, { and, eq, isNull }) => and(eq(ingredients.id, id), isNull(ingredients.deletedAt))
    })

    if (!ingredient) {
      return null
    }

    return DrizzleIngredientMapper.toDomain(ingredient)

  }

  async findByName(name: string): Promise<Ingredient | null> {

    const ingredient = await this.drizzle.db.query.ingredients.findFirst({
      where: (ingredients, { and, eq, isNull }) => and(
        eq(lower(ingredients.name), name.toLowerCase()),
        isNull(ingredients.deletedAt)
      )
    })

    if (!ingredient) {
      return null
    }

    return DrizzleIngredientMapper.toDomain(ingredient)

  }

  async findMany(options: FindManyIngredientsOptions): Promise<FindManyIngredientsResponse> {

    const { page, pageSize, sortBy, filters } = options


    const [sortColumn, sortDirection] = sortBy ? sortBy.split('.') : ['name', 'asc']

    const orderByFn = (sortDirection === 'asc' ? asc : desc)(dbSchema.ingredients[sortColumn])



    const whereClauses = [
      isNull(dbSchema.ingredients.deletedAt)
    ]



    const totalRecipeCount = this.drizzle.db.$with('total_recipe_count').as(
      this.drizzle.db
        .select({
          ingredientId: dbSchema.recipeIngredients.ingredientId,
          count: countDistinct(dbSchema.recipeIngredients.id).mapWith(Number).as('count')
        })
        .from(dbSchema.recipeIngredients)
        .where(isNull(dbSchema.recipeIngredients.deletedAt))
        .groupBy(dbSchema.recipeIngredients.ingredientId)
    )


    if (filters) {
      if (filters.name) {
        whereClauses.push(ilike(dbSchema.ingredients.name, `%${filters.name}%`))
      }
    }

    const countResult = await this.drizzle.db
      .with(totalRecipeCount)
      .select({ count: count() })
      .from(dbSchema.ingredients)
      .where(and(...whereClauses))


    const totalRowsCount = Number(countResult[0].count)


    const fieldsToSelect = {
      id: dbSchema.ingredients.id,
      name: dbSchema.ingredients.name,
      description: dbSchema.ingredients.description,
      totalRecipeCount: sql<number>`MAX(COALESCE(total_recipe_count.count, 0))`.mapWith(Number)
    }


    const ingredients = await this.drizzle.db
      .with(totalRecipeCount)
      .select(fieldsToSelect)
      .from(dbSchema.ingredients)
      .leftJoin(
        totalRecipeCount,
        eq(dbSchema.ingredients.id, totalRecipeCount.ingredientId)
      )
      .where(and(...whereClauses))
      .groupBy(dbSchema.ingredients.id)
      .orderBy(orderByFn)
      .limit(pageSize)
      .offset((page - 1) * pageSize)


    return {
      items: ingredients.map(DrizzleIngredientWithRecipeCountMapper.toDomain),
      totalRowsCount
    }

  }

  async findAll(): Promise<IngredientWithRecipeCount[]> {

    const totalRecipeCount = this.drizzle.db.$with('total_recipe_count').as(
      this.drizzle.db
        .select({
          ingredientId: dbSchema.recipeIngredients.ingredientId,
          count: countDistinct(dbSchema.recipeIngredients.id).mapWith(Number).as('count')
        })
        .from(dbSchema.recipeIngredients)

        .where(isNull(dbSchema.recipeIngredients.deletedAt))
        .groupBy(dbSchema.recipeIngredients.ingredientId)
    )


    const ingredients = await this.drizzle.db
      .with(totalRecipeCount)
      .select({
        id: dbSchema.ingredients.id,
        name: dbSchema.ingredients.name,
        totalRecipeCount: sql<number>`MAX(COALESCE(total_recipe_count.count, 0))`.mapWith(Number)
      })
      .from(dbSchema.ingredients)
      .where(isNull(dbSchema.ingredients.deletedAt))
      .leftJoin(
        totalRecipeCount,
        eq(dbSchema.ingredients.id, totalRecipeCount.ingredientId)
      )
      .groupBy(dbSchema.ingredients.id)
      .orderBy(asc(dbSchema.ingredients.name))

    return ingredients.map(DrizzleIngredientWithRecipeCountMapper.toDomain)


  }

}

