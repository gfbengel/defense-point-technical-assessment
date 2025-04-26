import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useDataTable } from './data-table-context'

interface IDataTableSimpleFacetedFilterProps {
  column: string
}

export function DataTableSimpleFacetedFilter({
  column,
}: IDataTableSimpleFacetedFilterProps) {
  const { table } = useDataTable()

  const tableColumn = table.getColumn(column)
  const facets = tableColumn?.getFacetedUniqueValues()
  const items = facets?.keys()
  const options = items ? Array.from(items) : []

  return (
    <Select onValueChange={(value) => tableColumn?.setFilterValue(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem value={option} key={option}>
              {option} [{facets?.get(option)}]
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
