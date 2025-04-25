
import { helpers } from '../helpers'

import { tablesSchema } from './tables'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const dbSchema = {
  ...tablesSchema,
  ...helpers,

}
