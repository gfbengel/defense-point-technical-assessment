import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: '../../.env' })

export default defineConfig({
  schema: './drizzle/schema/tables',
  out: './drizzle/migrations',
  dialect: 'postgresql',

  dbCredentials: {
    ssl: process.env.NODE_ENV === 'production',
    host: process.env.POSTGRES_HOST as string,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  },
})
