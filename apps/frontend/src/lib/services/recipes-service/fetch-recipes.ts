import { PaginatedData } from '@/lib/config/paginated-data'
import { PaginationParams } from '@/lib/config/pagination-params'

import { httpClient } from '../http-client'
import { RecipeWithIngredients } from '@/lib/entities/recipe-with-ingredients'

export interface FetchRecipesResponseData {
  recipes: RecipeWithIngredients[]
}

export type FetchRecipesResponse = PaginatedData<FetchRecipesResponseData>


export type FetchRecipesFilters = {
  name?: string
  ingredientIds?: string[]
}




export type FetchRecipesParams = PaginationParams<FetchRecipesFilters>


export async function fetchRecipes(params: FetchRecipesParams): Promise<FetchRecipesResponse> {

  const { data } = await httpClient.get<FetchRecipesResponse>('/recipes', {
    params
  })

  return data
}


