import { z } from 'zod'

import { SortParams } from '../config/paginated-data'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  PageSizeType,
  PaginationParams
} from '../config/pagination-params'


export const createPaginationSchema = <T extends z.ZodTypeAny>(filtersSchema: T) => {
  return z.object({
    page: z
      .coerce
      .number()
      .optional()
      .default(DEFAULT_PAGE)
      .transform(Number)
      .pipe(z.number().min(1)),
    pageSize: z.coerce.number()
      .optional()
      .default(DEFAULT_PAGE_SIZE)
      .transform(Number)
      .pipe(
        z.number().refine(
          (val): val is PageSizeType =>
            PAGE_SIZE_OPTIONS.includes(val as PageSizeType),
          {
            message: `Per page must be one of: ${PAGE_SIZE_OPTIONS.join(', ')}`,
          }
        )
      ),
    // pageIndex: z
    //   .coerce
    //   .number()
    //   .optional()
    //   .transform(val => val !== undefined ? Number(val) : undefined),
    sortBy: z
      .string()
      .optional()
      .refine(
        val => val === undefined || /^[a-zA-Z0-9_]+\.(asc|desc)$/.test(val),
        {
          message: 'Sort must be in the format "field.(asc|desc)"',
        }
      ),
    filters: filtersSchema.optional(),
  }).transform((data) => ({
    page: data.page,
    pageSize: data.pageSize as PageSizeType,
    sortBy: data.sortBy as SortParams['sortBy'] | undefined,
    filters: data.filters,
  }))
}

// Type assertion to ensure Zod schema output matches PaginationParams
export type ZodPaginationParams<T extends Record<string, string | string[] | number>> = PaginationParams<T>
