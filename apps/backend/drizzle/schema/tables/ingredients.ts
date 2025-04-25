
import { relations } from "drizzle-orm"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { timestampColumns } from "drizzle/helpers/timestamp-columns"
import { ulidId } from "drizzle/helpers/ulid"
import { z } from "zod"
import { recipeIngredients } from "./recipe-ingredients"

export const ingredients = pgTable('ingredients', {
  id: ulidId('id').primaryKey(),
  name: varchar('name', { length: 300 }).notNull(),
  description: text('description'),
  ...timestampColumns,
})



export const ingredientCreateSchema = createInsertSchema(ingredients, {
  id: schema => schema.ulid(),
})

export const ingredientUpdateSchema = createUpdateSchema(ingredients, {
  id: schema => schema.ulid(),
})

export type IngredientCreateSchema = z.infer<typeof ingredientCreateSchema>
export type IngredientUpdateSchema = z.infer<typeof ingredientUpdateSchema>

export const ingredientsRelations = relations(ingredients, ({ many }) => {
  return {
    recipes: many(recipeIngredients),
  }
})