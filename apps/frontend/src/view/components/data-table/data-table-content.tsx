/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useMemo } from 'react'

import { Table } from '@/view/components/ui/table'

import { DataTableBody, MemoizedDataTableBody } from './data-table-body'
import { useDataTable } from './data-table-context'
import { DataTableHeader } from './data-table-header'

export function DataTableContent() {
  const { table } = useDataTable()

  const colSizeVariables = useMemo(
    () =>
      table.getFlatHeaders().reduce<Record<string, number>>(
        (acc, header) => ({
          ...acc,
          [`--header-${header.id}-size`]: header.getSize(),
          [`--col-${header.column.id}-size`]: header.column.getSize(),
        }),
        {},
      ),
    [
      table.getFlatHeaders(),
      table.getState().columnSizingInfo,
      table.getState().columnSizing,
    ],
  )

  return (
    <Table style={colSizeVariables}>
      <DataTableHeader />
      {table.getState().columnSizingInfo.isResizingColumn && (
        <MemoizedDataTableBody />
      )}
      {!table.getState().columnSizingInfo.isResizingColumn && <DataTableBody />}
    </Table>
  )
}
