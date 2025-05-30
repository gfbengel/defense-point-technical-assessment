import { z } from "zod";
import { recipeSelectSchema } from "../tables/recipes";

export const recipeWithIngredientsSchema = recipeSelectSchema.extend({
  ingredients: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
  totalIngredientCount: z.number().default(0),
}).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  instructions: true,
})

export type RecipeWithIngredientsSchema = z.infer<typeof recipeWithIngredientsSchema>
