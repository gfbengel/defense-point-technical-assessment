import * as ingredients from './ingredients'
import * as recipes from './recipes'
import * as recipeIngredients from './recipe-ingredients'

export const tablesSchema = {
  ...ingredients,
  ...recipes,
  ...recipeIngredients,
}