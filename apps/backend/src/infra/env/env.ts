import { z } from 'zod'

export const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  SERVER_PORT: z.coerce.number().default(3333),
})

export const databaseSchema = z.object({
  POSTGRES_HOST: z.string().min(1, '"POSTGRES_HOST" is required.'),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_USER: z.string().min(1, '"POSTGRES_USER" is required.'),
  POSTGRES_PASSWORD: z.string().min(1, '"POSTGRES_PASSWORD" is required.'),
  POSTGRES_DB: z.string().min(1, '"POSTGRES_DB" is required.'),
})

export const envSchema = databaseEnvSchema.merge(databaseSchema)

export type DatabaseEnv = z.infer<typeof databaseSchema>

export type Env = z.infer<typeof envSchema>
