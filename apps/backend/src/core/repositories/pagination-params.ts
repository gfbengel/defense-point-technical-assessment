
export type PageSizeType = 5 | 10 | 20 | 35 | 50 | 100

export type SortByType = `${string}.${'asc' | 'desc'}`

export interface PaginationParams<
  T extends Record<string, string | string[] | number> = Record<string, never>,
> {
  page: number
  pageSize: PageSizeType
  filters?: T
  sortBy?: SortByType
}

export interface PaginationResponse<T> {
  items: T[]
  totalRowsCount: number
}
