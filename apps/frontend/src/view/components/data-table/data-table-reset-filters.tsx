import { XIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { useDataTable } from './data-table-context'


interface DataTableResetFiltersProps {
  onResetFilters?: () => void
}

export function DataTableResetFilters({ onResetFilters }: DataTableResetFiltersProps) {
  const { table, filters } = useDataTable()

  // const isFiltered = table.getState().columnFilters.length > 0

  const isFiltered = Object.keys(filters.filters || {}).length > 0
  const isSorted = table.getState().sorting.length > 0

  if (!isFiltered && !isSorted) return null

  // if (!isFiltered || !filters.filters) return null
  return (
    <Button
      variant="ghost"
      onClick={() => {
        table.resetColumnFilters()
        onResetFilters?.()
      }}
      className="h-8 px-2 lg:px-3"
    >
      Reset
      <XIcon />
    </Button>
  )
}
