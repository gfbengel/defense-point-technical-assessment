import { ComponentIcon } from 'lucide-react'
import React from 'react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'
import { useDataTable } from './data-table-context'

interface IDataTableBatchActionProps<_TData> {
  children: React.ReactNode
}

interface IDataTableBatchActionItemProps<TData> {
  onSelect: (rows: TData[]) => void
  children: React.ReactNode
}

export function DataTableBatchAction<TData>({
  children,
}: IDataTableBatchActionProps<TData>) {
  const { table } = useDataTable<TData>()

  const selectedRows = table.getSelectedRowModel().flatRows
  const selectedRowsOriginal = selectedRows.map((row) => row.original as TData)
  if (selectedRows.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="items-center">
          <ComponentIcon />
          Batch Action
          <Separator orientation="vertical" className="mx-2 h-4" />
          <small className="text-muted-foreground">
            {selectedRows.length} <span className="hidden lg:inline">selected</span>
          </small>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const typedChild = child as React.ReactElement<
              IDataTableBatchActionItemProps<TData>
            >
            return React.cloneElement(typedChild, {
              onSelect: () => {
                typedChild.props.onSelect(selectedRowsOriginal)
              },
            })
          }
          return null
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DataTableBatchActionItem<TData = { id: string }>({
  children,
  onSelect,
}: IDataTableBatchActionItemProps<TData>) {
  return (
    <DropdownMenuItem onSelect={() => onSelect}>{children}</DropdownMenuItem>
  )
}
