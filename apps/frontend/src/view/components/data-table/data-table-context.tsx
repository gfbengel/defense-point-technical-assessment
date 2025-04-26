import type { Table } from '@tanstack/react-table'
import { createContext, useContext } from 'react'

import { Filters } from '@/lib/config/paginated-data'

interface IDataTableContextValue<TData> {
  table: Table<TData>
  filters: Filters<TData>
  onFilterChange: (dataFilters: Partial<TData>) => void
}

// Create context with generic type but initial any type
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const DataTableContext = createContext<IDataTableContextValue<any>>(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  {} as IDataTableContextValue<any>,
)

// Updated hook with generic type parameter
export function useDataTable<TData>() {
  const ctxValue = useContext(DataTableContext) as IDataTableContextValue<TData>

  if (!ctxValue) {
    throw new Error('`useDataTable` should be used inside a DataTable.')
  }

  return ctxValue
}
