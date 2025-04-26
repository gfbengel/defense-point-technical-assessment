import { httpClient } from "../http-client"

export type ToggleFavoriteStatusParams = {
  recipeId: string
}

export async function toggleFavoriteStatus(params: ToggleFavoriteStatusParams) {
  await httpClient.patch(`/recipes/${params.recipeId}/toggle-favorite-status`)


}