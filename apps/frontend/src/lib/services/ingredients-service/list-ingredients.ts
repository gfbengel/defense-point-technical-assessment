

import { IngredientWithRecipeCount } from '@/lib/entities/ingredient-with-recipe-count'
import { httpClient } from '../http-client'


export type ListIngredientsResponse = {
  ingredients: IngredientWithRecipeCount[]
}


export async function listIngredients(): Promise<ListIngredientsResponse> {

  const { data } = await httpClient.get<ListIngredientsResponse>('/ingredients/list')

  return data
}


