import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { PAGE_SIZE_OPTIONS, PageSizeType } from '@/lib/config/pagination-params'

import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/view/components/ui/select'
import { useDataTable } from './data-table-context'

interface IDataTablePaginationProps {
  onPageSizeChange?: (pageSize: PageSizeType) => void
  onPageChange?: (page: number) => void
}

export function DataTablePagination({
  onPageSizeChange,
  onPageChange,
}: IDataTablePaginationProps) {
  const { table } = useDataTable()


  return (
    <div className="flex items-center gap-4 md:gap-10 w-full md:w-auto justify-between">

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 items-start">
        <small className="order-2 md:order-1">Rows per page</small>
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => {
            const pageSize = Number(value)
            table.setPageSize(pageSize)

            onPageSizeChange?.(pageSize as PageSizeType)
          }}
        >
          <SelectTrigger className="w-18 dark:bg-transparent order-1 md:order-2">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {PAGE_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 items-end">
        <small className="order-2 md:order-1">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </small>
        <div className="space-x-1 order-1 md:order-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              table.firstPage()
              onPageChange?.(1)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              table.previousPage()
              onPageChange?.(table.getState().pagination.pageIndex)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              table.nextPage()

              onPageChange?.(table.getState().pagination.pageIndex + 2)
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              table.lastPage()
              onPageChange?.(table.getPageCount())
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
