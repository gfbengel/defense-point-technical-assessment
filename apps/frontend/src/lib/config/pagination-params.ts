export type PageSizeType = 5 | 10 | 20 | 35 | 50 | 100
export type SortByType = `${string}.${'asc' | 'desc'}`

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 35, 50, 100] as const satisfies PageSizeType[]

export const DEFAULT_PAGE_SIZE = 20 as const satisfies PageSizeType

export const DEFAULT_PAGE = 1 as const satisfies number

export interface PaginationParams<T extends Record<string, string | string[] | number>> {
  page: number
  pageSize: PageSizeType
  filters?: T
  sortBy?: SortByType
}
