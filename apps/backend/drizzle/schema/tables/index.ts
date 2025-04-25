import { ingredients } from './ingredients'
import { recipes } from './recipes'
import { recipeIngredients } from './recipe-ingredients'

export const tablesSchema = {
  ...ingredients,
  ...recipes,
  ...recipeIngredients,
}
