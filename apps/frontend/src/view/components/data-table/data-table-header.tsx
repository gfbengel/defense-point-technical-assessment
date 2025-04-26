import { flexRender } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { TableHead, TableHeader, TableRow } from '@/view/components/ui/table'

import { useDataTable } from './data-table-context'

export function DataTableHeader() {
  const { table } = useDataTable()

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              style={{
                width: `calc(var(--header-${header.id}-size) * 1px)`,
              }}
              className="group relative"
            >
              {!header.isPlaceholder &&
                flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanResize() && (
                <div
                  className={cn(
                    'absolute top-0 right-2 h-full w-2 cursor-col-resize bg-primary/10 opacity-0 transition-all duration-300 group-hover:opacity-100',
                    header.column.getIsResizing() &&
                    'bg-primary/40 opacity-100',
                    'grid place-items-center',
                  )}
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                />
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}
