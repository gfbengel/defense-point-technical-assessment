import { z } from "zod";
import { recipeIngredientWithDetailsSchema } from "./recipe-ingredient-with-details";
import { recipeSelectSchema } from "../tables/recipes";

export const recipeWithDetailsSchema = recipeSelectSchema.extend({
  ingredients: z.array(recipeIngredientWithDetailsSchema),
})

export type RecipeWithDetailsSchema = z.infer<typeof recipeWithDetailsSchema>
