import type { Column } from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
} from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface IDataTableColumnHeaderProps<T> {
  column: Column<T>
  title: React.ReactNode
}

export function DataTableColumnHeader<T>({
  column,
  title,
}: IDataTableColumnHeaderProps<T>) {
  if (!column.getCanSort()) {
    return title
  }

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="-ml-3 cursor-pointer data-[state=open]:bg-accent"
          >
            {title}
            {!column.getIsSorted() && <ChevronsUpDownIcon />}
            {column.getIsSorted() === 'desc' && <ArrowDownIcon />}
            {column.getIsSorted() === 'asc' && <ArrowUpIcon />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="size-3 text-muted-foreground " />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="size-3 text-muted-foreground " /> Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => column.toggleVisibility(false)}>
                <EyeOffIcon className="size-3 text-muted-foreground " /> Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
