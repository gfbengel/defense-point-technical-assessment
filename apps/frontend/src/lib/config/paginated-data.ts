import { PageSizeType, SortByType } from './pagination-params'
export type PaginatedData<T> = {
  [key in keyof T]: T[key]
} & {
  totalRowsCount: number
}



export type PaginationParams = {
  page: number
  pageSize: PageSizeType
}

export type SortParams = { sortBy: SortByType }
export type Filters<T> = Partial<{ filters: Partial<T> } & PaginationParams & SortParams>

