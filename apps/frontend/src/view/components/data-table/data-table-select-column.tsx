import type { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '../ui/checkbox'

export const selectColumn: ColumnDef<unknown> = {
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={() => table.toggleAllPageRowsSelected()}
      className="-mt-1"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={row.getToggleSelectedHandler()}
      disabled={!row.getCanSelect()}
      className="-mt-1"
    />
  ),
  size: 40,
  maxSize: 40,
  minSize: 40,
  enableResizing: false,
  enableHiding: false,
  enableSorting: false,
}
