
import { relations } from "drizzle-orm"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod"
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


export const ingredientSelectSchema = createSelectSchema(ingredients, {
  id: schema => schema.ulid(),
})

export const ingredientUpdateSchema = createUpdateSchema(ingredients, {
  id: schema => schema.ulid(),
})

export const ingredientInsertSchema = createInsertSchema(ingredients, {
  id: schema => schema.ulid(),
})


export type IngredientSelectSchema = z.infer<typeof ingredientSelectSchema>
export type IngredientUpdateSchema = z.infer<typeof ingredientUpdateSchema>
export type IngredientInsertSchema = z.infer<typeof ingredientInsertSchema>
export type IngredientCreateSchema = z.infer<typeof ingredientCreateSchema>


export const ingredientsRelations = relations(ingredients, ({ many }) => {
  return {
    recipes: many(recipeIngredients),
  }
})