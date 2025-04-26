import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../config/pagination-params"

export const DEFAULT_PAGE_INDEX = DEFAULT_PAGE - 1

export const cleanEmptyParams = <T extends Record<string, unknown>>(
  search: T
) => {
  const newSearch = { ...search }
  Object.keys(newSearch).forEach(key => {
    if (key === 'filters' && newSearch.filters !== undefined) {
      const filters = newSearch[key] as Record<string, unknown>

      Object.keys(filters).forEach(filterKey => {
        if (filters[filterKey] === undefined || filters[filterKey] === '') {
          delete filters[filterKey]
        }
      })

      if (Object.keys(filters).length === 0) {

        delete newSearch[key]
      }


    } else {
      const value = newSearch[key]
      if (
        value === undefined ||
        value === '' ||
        (typeof value === 'number' && isNaN(value))
      ) {

        delete newSearch[key]
      }
    }
  })

  if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex
  if (search.page === DEFAULT_PAGE) delete newSearch.page
  if (search.pageSize === DEFAULT_PAGE_SIZE) delete newSearch.pageSize
  if (search.sortBy === undefined) delete newSearch.sortBy


  return newSearch
}
