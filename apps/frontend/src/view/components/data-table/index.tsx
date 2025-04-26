'use client'

import {
  type ColumnDef,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationOptions,
  type PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useRef } from 'react'

import { Filters } from '@/lib/config/paginated-data'

import { ActionColumnItem, generateActionColumn } from './data-table-actions-column'
import { DataTableContext } from './data-table-context'
import { selectColumn } from './data-table-select-column'


interface IDataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  pagination?: PaginationState
  onSelectRow?: (rows: TData[]) => void
  disableSelectColumn?: boolean
  paginationOptions: Pick<PaginationOptions, "onPaginationChange" | "rowCount">
  filters: Filters<TData>
  onFilterChange: (dataFilters: Partial<TData>) => void
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;

  children: React.ReactNode

  manualFiltering?: boolean
  manualPagination?: boolean
  manualSorting?: boolean

  columnVisibility?: Record<string, boolean>

  actionColumnItems?: ActionColumnItem[]
}

export function DataTable<TData>({

  data,
  columns,
  pagination,
  paginationOptions,
  filters,
  onFilterChange,
  sorting,
  onSortingChange,
  columnVisibility,
  actionColumnItems,
  children,
  onSelectRow,
  disableSelectColumn = false,
  manualFiltering = false,
  manualPagination = false,
  manualSorting = false,
}: IDataTableProps<TData>) {


  const actionColumn = generateActionColumn(actionColumnItems ?? [])

  const finalColumns = useMemo(() => {
    const returnColumns = [...columns]
    console.log('actionColumn', actionColumn)
    if (actionColumn) {
      returnColumns.push(actionColumn as ColumnDef<TData>)
    }
    if (!disableSelectColumn) {
      returnColumns.unshift(selectColumn as ColumnDef<TData>)
    }
    return returnColumns
  }, [columns, disableSelectColumn, actionColumn])

  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable<TData>({
    data,
    columns: finalColumns,
    state: { pagination, sorting },
    onSortingChange,
    ...paginationOptions,
    initialState: {
      columnVisibility,
      columnFilters: (!!filters && filters.filters && Object.keys(filters.filters).length > 0)
        ? Object.entries(filters.filters)
          .map(([key, value]) => ({
            id: key,
            value: value
          }))
        : []
    },
    // data: data,
    //
    // initialState: {
    //   pagination,
    //   // columnFilters,
    // }, // used to set data initial, like from api (react query)
    // state: {
    //   columnFilters,
    // },
    manualFiltering: manualFiltering, //used to filter with server side
    manualPagination: manualPagination, //used to pagination with server side
    manualSorting: manualSorting, //used to sorting with server side

    columnResizeMode: 'onChange',
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    ...(!manualSorting ? { getSortedRowModel: getSortedRowModel() } : {}),
    ...(!manualFiltering ? { getFilteredRowModel: getFilteredRowModel() } : {}),
    ...(!manualPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),

  })



  const selectedRows = useMemo(
    () => table.getSelectedRowModel().flatRows.map((row) => row.original),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.getSelectedRowModel().flatRows],
  )

  const memoOnSelectRow = useRef(onSelectRow)
  memoOnSelectRow.current = onSelectRow

  useEffect(() => {
    memoOnSelectRow.current?.(selectedRows)
  }, [selectedRows])



  return (
    <DataTableContext.Provider value={{ table, filters, onFilterChange }}>
      {children}
    </DataTableContext.Provider>
  )
}
