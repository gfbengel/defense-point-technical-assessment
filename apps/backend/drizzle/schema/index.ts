

import { extendedTablesSchema } from './extended'
import { helpers } from '../helpers'

import { tablesSchema } from './tables'

export const dbSchema = {
  ...tablesSchema,
  ...helpers,
  ...extendedTablesSchema,
}
