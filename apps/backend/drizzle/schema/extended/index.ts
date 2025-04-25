import * as ingredientWithRecipeCountSchema from "./ingredient-with-recipe-count"

export const extendedTablesSchema = {
  ...ingredientWithRecipeCountSchema,
}

export type ExtendedTablesSchema = typeof extendedTablesSchema
