
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { DEFAULT_PAGE, SortByType } from '@/lib/config/pagination-params'
import { DEFAULT_PAGE_SIZE } from '@/lib/config/pagination-params'
import { DataTable } from '@/view/components/data-table'
import { DataTableColumnsVisibilityDropdown } from '@/view/components/data-table/data-table-columns-visibility-dropdown'
import { DataTableContent } from '@/view/components/data-table/data-table-content'
import { DataTablePagination } from '@/view/components/data-table/data-table-pagination'
import { DataTableResetFilters } from '@/view/components/data-table/data-table-reset-filters'
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter'

import { columns as baseColumns } from './columns'
import { IngredientWithRecipeCount } from '@/lib/entities/ingredient-with-recipe-count'
import { defaultOnPaginationChange } from '@/lib/utils'
import { sortByToState, stateToSortBy } from '@/lib/utils/table-sort-mapper'
import { useFilters } from '@/lib/hooks/use-filters'

interface IngredientsTableProps {
  ingredients: IngredientWithRecipeCount[]
  totalRowsCount: number
}

export function IngredientsTable({ ingredients, totalRowsCount }: IngredientsTableProps) {

  const {
    filters,
    setPageSize,
    setPage,
    setFilters,
    setSortBy,
    resetFilters
  } = useFilters('/_app/ingredients/')


  const columns = useMemo<ColumnDef<IngredientWithRecipeCount>[]>(() => [...baseColumns], [])

  const paginationState = useMemo(() => ({
    pageSize: filters?.pageSize || DEFAULT_PAGE_SIZE,
    pageIndex: (filters?.page || DEFAULT_PAGE) - 1,
  }), [filters])

  const sortingState = sortByToState(filters.sortBy);

  const handleFilterChange = (dataFilters: Partial<IngredientWithRecipeCount>) => {
    setFilters({
      filters: dataFilters
    })
  }

  const handlePaginationChange = defaultOnPaginationChange({ setFilters, paginationState })

  return (
    <DataTable<IngredientWithRecipeCount>
      manualFiltering={true}
      manualPagination={true}
      manualSorting={true}
      data={ingredients}
      columns={columns}
      pagination={paginationState}
      onSelectRow={(selectedRows: any) => console.log(selectedRows)}
      paginationOptions={{
        onPaginationChange: handlePaginationChange,
        rowCount: totalRowsCount,
      }}
      filters={filters}
      onFilterChange={handleFilterChange}
      sorting={sortingState}
      onSortingChange={(updaterOrValue) => {
        const newSortingState =
          typeof updaterOrValue === "function"
            ? updaterOrValue(sortingState)
            : updaterOrValue;
        return setSortBy(stateToSortBy(newSortingState) as SortByType);
      }}


      columnVisibility={{
        responsibleIds: false,
      }}
    >
      <div className=" mb-4 flex flex-col gap-2 lg:gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4">
          <div className="order-2 lg:order-1 flex flex-1 items-center gap-4">
            <DataTableTextFilter
              value={filters?.filters?.name}
              column="name"
              placeholder="Search by name"
              className="w-full lg:w-72"
              onFilterChange={setFilters}
            />



            <DataTableResetFilters
              onResetFilters={resetFilters}
            />
          </div>

          <div className="order-1 lg:order-2 flex justify-between items-center gap-2 lg:gap-4">

            <DataTableColumnsVisibilityDropdown menuAlign="end" className="ml-auto" />
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 lg:gap-4">


        </div>
      </div>



      <DataTableContent />

      <div className="mt-2 lg:mt-4 flex items-center justify-end">
        <DataTablePagination onPageSizeChange={setPageSize} onPageChange={setPage} />
      </div>
    </DataTable>
  )
}
