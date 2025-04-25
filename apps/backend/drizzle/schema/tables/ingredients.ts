
import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createUpdateSchema } from "drizzle-zod"
import { timestampColumns } from "drizzle/helpers/timestamp-columns"
import { ulidId } from "drizzle/helpers/ulid"
import { z } from "zod"

export const ingredients = pgTable('ingredients', {
  id: ulidId('id').primaryKey(),
  name: varchar('name', { length: 300 }).notNull(),
  description: text('description'),
  ...timestampColumns,
})


export const ingredientUpdateSchema = createUpdateSchema(ingredients, {
  id: schema => schema.ulid(),
})

export type IngredientUpdateSchema = z.infer<typeof ingredientUpdateSchema>
