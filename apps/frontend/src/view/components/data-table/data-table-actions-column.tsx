import type { ColumnDef } from '@tanstack/react-table'
import { EllipsisIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DropdownMenu } from '../ui/dropdown-menu'


export type ActionColumnItem = {
  label: string
  onSelect: (rowItemId: string) => void
}



export function generateActionColumn<T extends { id: string } = { id: string }>(actionColumnItems: ActionColumnItem[]): ColumnDef<T> | undefined {

  if (actionColumnItems.length === 0) { return undefined }

  return {
    id: 'actions',
    size: 80,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enableSorting: false,
    enableResizing: false,
    enableMultiSort: false,


    cell: ({ row }) => {

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actionColumnItems.map((item) => (
                <DropdownMenuItem key={item.label} onSelect={() => item.onSelect(row.original.id)}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div >
      )
    }
  } satisfies ColumnDef<T>

}



