import { z } from 'zod'
import { ingredientSelectSchema } from '../tables/ingredients'


export const ingredientWithRecipeCountSchema = ingredientSelectSchema.extend({
  totalRecipeCount: z.number(),
})

export type IngredientWithRecipeCountSchema = z.infer<typeof ingredientWithRecipeCountSchema>