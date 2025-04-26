import { fetchRecipes } from "./fetch-recipes"
import { getRecipe } from "./get-recipe"
import { toggleFavoriteStatus } from "./toggle-favorite-status"

export const recipesService = {
  fetchRecipes,
  toggleFavoriteStatus,
  getRecipe,
}
