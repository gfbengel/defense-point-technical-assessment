import { useEffect, useState } from 'react'

import { Input } from '../ui/input'
import { useDataTable } from './data-table-context'

interface IDataTableTextFilterProps {
  placeholder?: string
  column?: string
  className?: string
  onFilterChange?: (filter: { [key: string]: string }, resetPage?: boolean) => void
  debounceTime?: number
  value?: string
}

export function DataTableTextFilter({
  placeholder,
  column,
  className,
  onFilterChange,
  debounceTime = 300,
  value: initialValue = '',
}: IDataTableTextFilterProps) {
  const { table } = useDataTable()

  const [value, setValue] = useState<string>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])


  useEffect(() => {
    if (!column) return

    const timeout = setTimeout(() => {
      onFilterChange?.({ [column]: value })
    }, debounceTime)

    return () => clearTimeout(timeout)

  }, [column, debounceTime, onFilterChange, value])

  if (column) {
    // const tableColumn = table.getColumn(column)
    // const filterValue = tableColumn?.getFilterValue() as string | undefined

    // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   tableColumn?.setFilterValue(event.target.value)

    //   const filter = { [column]: event.target.value }
    //   onFilterChange?.(filter)
    // }


    return (

      <Input
        placeholder={placeholder}
        value={value}
        onChange={e => {
          if (e.target.value === '') return setValue('')
          setValue(e.target.value)
          //handleFilterChange(e)
        }}
        className={className}
      />
    )
  }

  return (
    <Input

      placeholder={placeholder}
      onChange={(event) => table?.setGlobalFilter(event.target.value)}
      className={className}
    />
  )
}
