import { PaginationParams, PaginationResponse } from "@/core/repositories/pagination-params";
import { RecipeWithIngredients } from "../entities/value-objects/recipe-with-ingredients";
import { RecipeWithDetails } from "../entities/value-objects/recipe-with-details";

type FindManyRecipesFilters = {
  title?: string
  ingredientIds?: string[]
}

export type FindManyRecipesOptions = PaginationParams<FindManyRecipesFilters>

export type FindManyRecipesResponse = PaginationResponse<RecipeWithIngredients>


export abstract class RecipesRepository {
  abstract findById(id: string): Promise<RecipeWithDetails | null>

  abstract findMany(options: FindManyRecipesOptions): Promise<FindManyRecipesResponse>

}
