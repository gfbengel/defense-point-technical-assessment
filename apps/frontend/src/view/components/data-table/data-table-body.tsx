import { flexRender } from '@tanstack/react-table'
import { memo } from 'react'

import { TableBody, TableCell, TableRow } from '../ui/table'
import { useDataTable } from './data-table-context'

export function DataTableBody() {
  const { table } = useDataTable()

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? 'selected' : ''}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              style={{
                width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
              }}
              className=""
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export const MemoizedDataTableBody = memo(DataTableBody)
