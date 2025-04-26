import { Settings2Icon } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useDataTable } from './data-table-context'

interface IDataTableColumnsVisibilityDropdownProps {
  menuAlign?: 'start' | 'end' | 'center'
  className?: string
}

export function DataTableColumnsVisibilityDropdown({
  menuAlign,
  className,
}: IDataTableColumnsVisibilityDropdownProps) {
  const { table } = useDataTable()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant={'outline'} className={className}>
          <Settings2Icon /> View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={menuAlign}>
        {table.getAllColumns().map((column) =>
          !column.getCanHide() ? null : (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={column.toggleVisibility}
            >
              {column.columnDef.meta?.nameInViewFilter}
            </DropdownMenuCheckboxItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
