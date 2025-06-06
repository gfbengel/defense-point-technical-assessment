'use client'
import { Check, PlusCircle } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/view/components/ui/popover'
import { ScrollArea } from '@/view/components/ui/scroll-area'
import { Separator } from '@/view/components/ui/separator'
import { useDataTable } from './data-table-context'


interface DataTableFacetedFilterProps {
  column: string
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
    count?: number
    subLabel?: string
  }[]
  onSelect?: (value: string[]) => void
}

export function DataTableFacetedFilter({
  column,
  title,
  options,
  onSelect,
}: DataTableFacetedFilterProps) {
  const { table } = useDataTable()

  const tableColumn = table.getColumn(column)

  const [selectedValues, setSelectedValues] = React.useState<Set<string>>(
    new Set(tableColumn?.getFilterValue() as string[] ?? [])
  )

  React.useEffect(() => {
    setSelectedValues(new Set(tableColumn?.getFilterValue() as string[] ?? []))
  }, [tableColumn])

  const hasSubLabel = options.some((option) => option.subLabel)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn(
          "border-dashed",
          selectedValues?.size > 0 && "pr-1!"
        )}>
          <PlusCircle />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className=" ml-0.5 h-4" />
              <Badge
                variant="secondary"
                className="-ml-1 rounded-md px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex -ml-0.5">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-lg px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-lg px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-72 w-auto p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList >
            <CommandEmpty>No results found.</CommandEmpty>
            {options.length > 0 && (

              <CommandGroup className={cn(
                "max-w-70 min-w-55"
              )}>
                <div className={cn(
                  "overflow-hidden",
                  (options.length > 5) && (hasSubLabel ? 'h-60.25' : 'h-40'),

                )}>
                  <ScrollArea className="h-full ">
                    {options.map((option) => {
                      const isSelected = selectedValues.has(option.value)
                      return (
                        <CommandItem
                          className="max-w-68"
                          key={option.value}
                          onSelect={() => {
                            const newSelectedValues = new Set(selectedValues)
                            if (isSelected) {
                              newSelectedValues.delete(option.value)
                            } else {
                              newSelectedValues.add(option.value)
                            }
                            setSelectedValues(newSelectedValues)

                            const filterValues = Array.from(newSelectedValues)
                            if (filterValues.length) {
                              onSelect?.(filterValues)
                              tableColumn?.setFilterValue(filterValues)
                            } else {
                              onSelect?.([])
                              tableColumn?.setFilterValue(undefined)
                            }
                          }}
                        >
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible',
                            )}
                          >
                            <Check className="text-primary-foreground" />
                          </div>
                          {option.icon && (
                            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                          )}
                          <div className="flex-1 truncate flex flex-col">
                            <span className="truncate">{option.label}</span>
                            {option.subLabel && (
                              <span className="text-xs text-muted-foreground">{option.subLabel}</span>
                            )}
                          </div>

                          {option.count && (
                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                              {option.count}
                            </span>
                          )}
                        </CommandItem>
                      )
                    })}

                  </ScrollArea>
                </div>
              </CommandGroup>

            )}
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues(new Set())
                      tableColumn?.setFilterValue(undefined)
                      onSelect?.([])
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  )
}
