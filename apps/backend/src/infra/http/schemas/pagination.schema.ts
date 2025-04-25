import { z } from 'zod'

import { PageSizeType, PaginationParams, SortByType } from '@/core/repositories/pagination-params'


const pageSizeArray = [5, 10, 20, 35, 50, 100] as const satisfies PageSizeType[]
const defaultPageSize = 20 as const satisfies PageSizeType

export const createPaginationSchema = <T extends z.ZodTypeAny>(filtersSchema: T) => {
  return z.object({
    page: z
      .string()
      .optional()
      .default('1')
      .transform(Number)
      .pipe(z.number().min(1)),
    pageSize: z.coerce.number()
      .optional()
      .default(defaultPageSize)
      .transform(Number)
      .pipe(
        z.number().refine(
          (val): val is PageSizeType =>
            pageSizeArray.includes(val as PageSizeType),
          {
            message: `Per page must be one of: ${pageSizeArray.join(', ')}`,
          }
        )
      ),
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
    sortBy: data.sortBy as SortByType,
    filters: data.filters,
  }))
}

// Type assertion to ensure Zod schema output matches PaginationParams
export type ZodPaginationParams<T extends Record<string, string>> = PaginationParams<T>
