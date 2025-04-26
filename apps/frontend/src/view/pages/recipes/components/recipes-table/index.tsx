
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'

import { DEFAULT_PAGE, SortByType } from '@/lib/config/pagination-params'
import { DEFAULT_PAGE_SIZE } from '@/lib/config/pagination-params'
import { useFilters } from '@/lib/hooks/use-filters'
import { defaultOnPaginationChange } from '@/lib/utils/default-on-pagination-change'
import { sortByToState, stateToSortBy } from '@/lib/utils/table-sort-mapper'
import { DataTable } from '@/view/components/data-table'
import { DataTableColumnsVisibilityDropdown } from '@/view/components/data-table/data-table-columns-visibility-dropdown'
import { DataTableContent } from '@/view/components/data-table/data-table-content'
import { DataTableFacetedFilter } from '@/view/components/data-table/data-table-faceted-filter'
import { DataTablePagination } from '@/view/components/data-table/data-table-pagination'
import { DataTableResetFilters } from '@/view/components/data-table/data-table-reset-filters'
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter'

import { columns as baseColumns } from './columns'
import { RecipeWithIngredients } from '@/lib/entities/recipe-with-ingredients'
import { useIngredientListQuery } from '@/lib/hooks/queries/use-ingredients-list-query'


interface RecipesTableProps {
  recipes: RecipeWithIngredients[]
  totalRowsCount: number
}

export function RecipesTable({ recipes, totalRowsCount, }: RecipesTableProps) {

  const {
    filters,
    setPageSize,
    setPage,
    setFilters,
    setSortBy,
    resetFilters
  } = useFilters('/_app/recipes/')


  const { ingredients, isLoading: isIngredientsListLoading } = useIngredientListQuery()


  const columns = useMemo<ColumnDef<RecipeWithIngredients>[]>(() => [...baseColumns], [])


  const paginationState = useMemo(() => ({
    pageSize: filters?.pageSize || DEFAULT_PAGE_SIZE,
    pageIndex: (filters?.page || DEFAULT_PAGE) - 1,
  }), [filters])

  const sortingState = sortByToState(filters.sortBy);

  const handleFilterChange = (dataFilters: Partial<RecipeWithIngredients>) => {

    setFilters({
      filters: dataFilters
    });
  }

  const handlePaginationChange = defaultOnPaginationChange({ setFilters, paginationState })

  const handleCategoryFilterChange = useCallback((ingredientIds: string[]) => {

    if (ingredientIds.length === 0) {
      setFilters({
        ingredientIds: undefined,
      })
    } else {
      setFilters({
        ingredientIds: ingredientIds,
      })
    }
  }, [setFilters])

  if (isIngredientsListLoading) {
    return null
  }

  return (
    <DataTable<RecipeWithIngredients>
      disableSelectColumn
      manualFiltering={true}
      manualPagination={true}
      manualSorting={true}
      data={recipes}
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
        ingredientIds: false,
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
          <DataTableFacetedFilter
            options={ingredients.map((ingredient) => ({
              label: ingredient.name,
              value: ingredient.id,
              count: ingredient.totalRecipeCount,
            }))}
            column="ingredientIds"
            title="Ingredients"
            onSelect={handleCategoryFilterChange}

          />

        </div>
      </div>

      <DataTableContent />

      <div className="mt-2 lg:mt-4 flex items-center justify-end">
        <DataTablePagination onPageSizeChange={setPageSize} onPageChange={setPage} />
      </div>
    </DataTable>
  )
}
