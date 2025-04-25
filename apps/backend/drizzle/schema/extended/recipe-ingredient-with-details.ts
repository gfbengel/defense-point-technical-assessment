import { z } from "zod"
import { recipeIngredientSelectSchema } from "../tables/recipe-ingredients"

export const recipeIngredientWithDetailsSchema = recipeIngredientSelectSchema.extend({
  name: z.string(),
})

export type RecipeIngredientWithDetailsSchema = z.infer<typeof recipeIngredientWithDetailsSchema>