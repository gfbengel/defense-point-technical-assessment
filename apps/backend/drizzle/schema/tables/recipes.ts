
import { boolean, index, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod"
import { timestampColumns } from "drizzle/helpers/timestamp-columns"
import { ulidId } from "drizzle/helpers/ulid"
import { z } from "zod"
import { recipeIngredients } from "./recipe-ingredients"
import { relations } from "drizzle-orm"

export const recipes = pgTable('recipes', {
  id: ulidId('id').primaryKey(),
  title: varchar('title', { length: 300 }).notNull(),
  description: varchar('description', { length: 500 }).notNull(),
  instructions: text('instructions').notNull(),
  timeToCookInMinutes: integer('time_to_cook_in_minutes').notNull(),
  image: varchar('image', { length: 400 }),
  isFavorite: boolean('is_favorite').notNull().default(false),
  ...timestampColumns,
}, (t) => ([
  index('is_favorite_idx').on(t.isFavorite)
]))


export const recipeSelectSchema = createSelectSchema(recipes, {
  id: schema => schema.ulid(),
  isFavorite: schema => schema.default(false),
})

export const recipeCreateSchema = createInsertSchema(recipes, {
  id: schema => schema.ulid(),
  isFavorite: schema => schema.default(false),
})

export const recipeInsertSchema = createInsertSchema(recipes, {
  id: schema => schema.ulid(),
  isFavorite: schema => schema.default(false),
})
export const recipeUpdateSchema = createUpdateSchema(recipes, {
  id: schema => schema.ulid(),
  isFavorite: schema => schema.default(false),
})

export type RecipeInsertSchema = z.infer<typeof recipeInsertSchema>
export type RecipeSelectSchema = z.infer<typeof recipeSelectSchema>
export type RecipeCreateSchema = z.infer<typeof recipeCreateSchema>
export type RecipeUpdateSchema = z.infer<typeof recipeUpdateSchema>

export const recipesRelations = relations(recipes, ({ many }) => {
  return {
    ingredients: many(recipeIngredients),
  }
})