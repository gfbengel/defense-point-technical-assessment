import { PaginatedData } from '@/lib/config/paginated-data'
import { PaginationParams } from '@/lib/config/pagination-params'
import { IngredientWithRecipeCount } from '@/lib/entities/ingredient-with-recipe-count'

import { httpClient } from '../http-client'

export interface FetchIngredientsResponseData {
  ingredients: IngredientWithRecipeCount[]
}


export type FetchIngredientsResponse = PaginatedData<FetchIngredientsResponseData>


export type FetchIngredientsFilters = {
  name?: string
}




export type FetchIngredientsParams = PaginationParams<FetchIngredientsFilters>


export async function fetchIngredients(params: FetchIngredientsParams): Promise<FetchIngredientsResponse> {

  const { data } = await httpClient.get<FetchIngredientsResponse>('/ingredients', {
    params
  })

  return data
}


