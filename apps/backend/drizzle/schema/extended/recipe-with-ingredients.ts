import { z } from "zod";
import { recipeIngredientWithDetailsSchema } from "./recipe-ingredient-with-details";
import { recipeSelectSchema } from "../tables/recipes";

export const recipeWithIngredientsSchema = recipeSelectSchema.extend({
  ingredients: z.array(recipeIngredientWithDetailsSchema),
})

export type RecipeWithIngredientsSchema = z.infer<typeof recipeWithIngredientsSchema>
