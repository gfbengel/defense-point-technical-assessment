import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['development', 'staging', 'production']).default('development'),
  DEV: z.boolean(),
  PROD: z.boolean(),
  VITE_API_URL: z.string(),
  SSR: z.boolean(),
  VITE_PORT: z.coerce.number().default(5173),
})

const _env = envSchema.safeParse(import.meta.env)


if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error.format())

  throw new Error('Invalid environment variables.')
}


export const env = _env.data
