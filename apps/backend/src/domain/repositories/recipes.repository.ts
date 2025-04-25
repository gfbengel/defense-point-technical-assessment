import { PaginationParams, PaginationResponse } from "@/core/repositories/pagination-params";
import { Recipe } from "../entities/recipe";
import { RecipeWithIngredients } from "../entities/value-objects/recipe-with-ingredients";

type FindManyRecipesFilters = {
  title?: string
  ingredientIds?: string[]
}

export type FindManyRecipesOptions = PaginationParams<FindManyRecipesFilters>

export type FindManyRecipesResponse = PaginationResponse<Recipe>


export abstract class RecipesRepository {
  abstract findById(id: string): Promise<RecipeWithIngredients | null>

  abstract findMany(options: FindManyRecipesOptions): Promise<FindManyRecipesResponse>

}
