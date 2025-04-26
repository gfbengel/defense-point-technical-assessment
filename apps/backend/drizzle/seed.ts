import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { ulid } from 'ulidx'


import { faker } from '@faker-js/faker'
import { IngredientCreateSchema } from './schema/tables/ingredients'

import { dbSchema } from './schema'
import { RecipeCreateSchema } from './schema/tables/recipes'
import { recipeIngredientUnits } from './schema/tables/recipe-ingredients'
import { RecipeIngredientCreateSchema } from './schema/tables/recipe-ingredients'

dotenv.config({ path: '../../.env' })
dotenv.config({ path: '../.env' })
dotenv.config({ path: './.env' })


const DATABASE_URL = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: DATABASE_URL,
})

const db = drizzle(pool)


async function main() {

  console.log('🌱 Seeding database...')

  console.log('Deleting existing recipes and ingredients...')
  await db.delete(dbSchema.recipeIngredients)
  await db.delete(dbSchema.recipes)
  await db.delete(dbSchema.ingredients)


  console.log('Generating 500 ingredients...')


  const generatedIngredients: IngredientCreateSchema[] = Array.from({ length: 500 }, () => {
    return {
      id: ulid(),
      name: faker.food.ingredient(),
      description: faker.lorem.sentence(),
      createdAt: new Date(),
      updatedAt: new Date(),

    }
  })

  // Remove duplicate ingredients based on name
  console.log('Removing duplicate ingredients...')
  const uniqueIngredientNames = new Set<string>()
  const ingredientBatch: IngredientCreateSchema[] = []

  for (const ingredient of generatedIngredients) {
    if (!uniqueIngredientNames.has(ingredient.name.toLowerCase())) {
      uniqueIngredientNames.add(ingredient.name.toLowerCase())
      ingredientBatch.push(ingredient)
    }
  }

  console.log(`Removed ${ingredientBatch.length - ingredientBatch.length} duplicate ingredients`)


  // Insert ingredients in batches
  console.log('Inserting ingredients...')
  await db.insert(dbSchema.ingredients).values(ingredientBatch)
  console.log('Inserted 500 ingredients')



  console.log('Generating 300 recipes...')

  const recipeNameFn = [
    () => faker.food.dish(),
    () => `${faker.food.ethnicCategory()} ${faker.food.dish()}`,
  ]


  const recipeBatch: RecipeCreateSchema[] = Array.from({ length: 300 }, () => {


    return {
      id: ulid(),
      title: faker.helpers.arrayElement(recipeNameFn)(),
      description: faker.food.description(),
      createdAt: new Date(),
      updatedAt: new Date(),
      instructions: faker.lorem.paragraphs({ min: 3, max: 5 }),
      image: faker.image.url({ width: 800, height: 600 }),
      isFavorite: false,
      timeToCookInMinutes: faker.number.int({ min: 10, max: 180 }),
    }
  })

  // Insert recipes in batches
  console.log('Inserting recipes...')
  await db.insert(dbSchema.recipes).values(recipeBatch)
  console.log('Inserted 300 recipes')



  console.log('Generating recipe ingredients...')



  console.log('Generating recipe ingredients relationships...')
  const recipeIngredientsBatch: RecipeIngredientCreateSchema[] = []

  for (const recipe of recipeBatch) {
    // Get random number of ingredients between 3 and 10
    const ingredientCount = faker.number.int({ min: 3, max: 10 })

    // Select random ingredients for this recipe
    const selectedIngredients = faker.helpers.arrayElements(
      ingredientBatch,
      ingredientCount
    )


    // Create recipe-ingredient relationships
    for (const ingredient of selectedIngredients) {
      recipeIngredientsBatch.push({
        id: ulid(),
        recipeId: recipe.id,
        ingredientId: ingredient.id,
        quantity: faker.number.int({ min: 1, max: 500 }),
        unit: faker.helpers.arrayElement(recipeIngredientUnits.enumValues),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  // Insert recipe ingredients in batches
  console.log(`Inserting ${recipeIngredientsBatch.length} recipe ingredients...`)

  // Insert in chunks to avoid potential DB limits
  const chunkSize = 500
  for (let i = 0; i < recipeIngredientsBatch.length; i += chunkSize) {
    const chunk = recipeIngredientsBatch.slice(i, i + chunkSize)
    await db.insert(dbSchema.recipeIngredients).values(chunk)
    console.log(`Inserted ${Math.min(i + chunkSize, recipeIngredientsBatch.length)} of ${recipeIngredientsBatch.length} recipe ingredients`)
  }

  console.log('✅ Database seeded successfully!')
}

main().catch(error => {
  console.error('❌ Error seeding database:', error)
  process.exit(1)
})
