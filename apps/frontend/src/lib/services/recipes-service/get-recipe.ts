

import { httpClient } from '../http-client'
import { RecipeWithDetails } from '@/lib/entities/recipe-with-details'


export type GetRecipeResponse = {
  recipe: RecipeWithDetails
}


export type GetRecipeParams = {
  recipeId: string
}

export async function getRecipe({ recipeId }: GetRecipeParams): Promise<GetRecipeResponse> {

  const { data } = await httpClient.get<GetRecipeResponse>(`/recipes/${recipeId}`)

  return data
}


