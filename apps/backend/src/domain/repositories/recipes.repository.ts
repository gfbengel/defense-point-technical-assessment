import { PaginationParams, PaginationResponse } from "@/core/repositories/pagination-params";
import { RecipeWithIngredients } from "../entities/value-objects/recipe-with-ingredients";
import { RecipeWithDetails } from "../entities/value-objects/recipe-with-details";
import { Recipe } from "../entities/recipe";

type FindManyRecipesFilters = {
  title?: string
  ingredientIds?: string[]
}

export type FindManyRecipesOptions = PaginationParams<FindManyRecipesFilters>

export type FindManyRecipesResponse = PaginationResponse<RecipeWithIngredients>


export abstract class RecipesRepository {
  abstract save(recipe: Recipe): Promise<void>
  abstract findById(id: string): Promise<Recipe | null>
  abstract findDetailedById(id: string): Promise<RecipeWithDetails | null>

  abstract findMany(options: FindManyRecipesOptions): Promise<FindManyRecipesResponse>


  abstract toggleFavoriteStatus(id: string): Promise<void>
}
