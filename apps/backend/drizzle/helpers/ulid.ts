import { text } from 'drizzle-orm/pg-core'
import { ulid } from 'ulidx'

const generateUlid = () => ulid()
// Base column definition for ULID

export const nullableUlidId = (name: string) =>
  text(name).$defaultFn(generateUlid)

export const ulidId = (name: string) =>
  nullableUlidId(name).notNull()
