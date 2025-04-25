
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createUpdateSchema } from "drizzle-zod"
import { timestampColumns } from "drizzle/helpers/timestamp-columns"
import { ulidId } from "drizzle/helpers/ulid"
import { z } from "zod"

export const recipes = pgTable('recipes', {
  id: ulidId('id').primaryKey(),
  title: varchar('title', { length: 300 }).notNull(),
  description: varchar('description', { length: 500 }),
  instructions: text('instructions').notNull(),
  image: varchar('image', { length: 400 }),
  isFavorite: boolean('is_favorite').notNull().default(false),
  ...timestampColumns,
})


export const recipeUpdateSchema = createUpdateSchema(recipes, {
  id: schema => schema.ulid(),
})

export type RecipeUpdateSchema = z.infer<typeof recipeUpdateSchema>
