import dotenv from 'dotenv'
import { Client } from 'pg'

dotenv.config({ path: '../../.env' })
dotenv.config({ path: '../.env' })
dotenv.config({ path: './.env' })

const DATABASE_URL = process.env.DATABASE_URL

async function createDatabase() {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // Parse the connection URL to get database name
  const dbName = DATABASE_URL.split('/').pop()?.split('?')[0]
  // Create connection URL without specific database
  const baseConnectionUrl = DATABASE_URL.replace(`/${dbName}`, '/postgres')

  const client = new Client({
    connectionString: baseConnectionUrl,
  })

  try {
    await client.connect()
    // Check if database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    )

    if (result.rows.length === 0) {
      // Database doesn't exist, create it
      console.log(`Creating database ${dbName}...`)
      await client.query(`CREATE DATABASE "${dbName}"`)
      console.log(`Database ${dbName} created successfully!`)
    } else {
      console.log(`Database ${dbName} already exists`)
    }
  } catch (error) {
    console.error('Error creating database:', error)
    throw error
  } finally {
    await client.end()
  }
}

createDatabase().catch((error) => {
  console.error('Failed to create database:', error)
  process.exit(1)
})
