import { integer, pgEnum, pgTable } from "drizzle-orm/pg-core";
import { timestampColumns } from "drizzle/helpers/timestamp-columns";
import { ulidId } from "drizzle/helpers/ulid";
import { ingredients } from "./ingredients";
import { recipes } from "./recipes";
import { createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const recipeIngredientUnits = pgEnum('recipe_ingredient_units', [
  'mg',
  'g',
  'kg',
  'ml',
  'l',
  'tsp',
  'tbsp',
  'cup',
  'pinch',
  'dash',
  'oz',
  'lb',
  'clove',
  'piece',
  'slice',
]);



export const recipeIngredients = pgTable('recipe_ingredients', {
  id: ulidId('id').primaryKey(),
  recipeId: ulidId('recipe_id').references(() => recipes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  ingredientId: ulidId('ingredient_id').references(() => ingredients.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  quantity: integer('quantity').notNull(),
  unit: recipeIngredientUnits('unit').notNull(),

  ...timestampColumns,
})


export const recipeIngredientUpdateSchema = createUpdateSchema(recipeIngredients, {
  id: schema => schema.ulid(),
})

export type RecipeIngredientUpdateSchema = z.infer<typeof recipeIngredientUpdateSchema>

export const recipeIngredientsRelations = relations(recipeIngredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeIngredients.recipeId],
    references: [recipes.id],
    relationName: 'recipe_ingredients_recipe',
  }),
  ingredient: one(ingredients, {
    fields: [recipeIngredients.ingredientId],
    references: [ingredients.id],
    relationName: 'recipe_ingredients_ingredient',
  }),
}))