import { RecipeWithIngredients } from "@/domain/entities/value-objects/recipe-with-ingredients";
import { FindManyRecipesOptions, FindManyRecipesResponse, RecipesRepository } from "@/domain/repositories/recipes.repository";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "../drizzle.service";
import { DrizzleRecipeWithIngredientsMapper } from "../mappers/drizzle-recipe-with-ingredients.mapper";
import { isNull, sql } from "drizzle-orm";
import { dbSchema } from "drizzle/schema";
import { and, eq } from "drizzle-orm";


@Injectable()
export class DrizzleRecipesRepository implements RecipesRepository {
  constructor(private readonly drizzle: DrizzleService) { }

  async findById(id: string): Promise<RecipeWithIngredients | null> {

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

    return DrizzleRecipeWithIngredientsMapper.toDomain({ ...recipe, ingredients: recipeIngredients })
  }

  async findMany(options: FindManyRecipesOptions): Promise<FindManyRecipesResponse> {
    console.log(options)
    throw new Error("Method not implemented.");
  }

}


