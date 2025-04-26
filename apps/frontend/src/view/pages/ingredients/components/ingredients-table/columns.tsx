import type { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header'
import { DataTableIdCell } from '@/view/components/data-table/data-table-id-cell'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip";
import { IngredientWithRecipeCount } from '@/lib/entities/ingredient-with-recipe-count';

export const columns: ColumnDef<IngredientWithRecipeCount>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader title="#" column={column} />,
    cell: ({ row }) => <DataTableIdCell row={row} />,

    size: 80,
    enableResizing: false,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'name',

    header: ({ column }) => (
      <DataTableColumnHeader
        title="Name"
        column={column}
      />
    ),
    cell: ({ row }) => {
      return row.original.name
    },
    meta: {
      nameInViewFilter: 'Name',
    },
    filterFn: (row, _id, value) => {
      return row.original.name.toLowerCase().includes(value.toLowerCase())
    },
    sortingFn: (a, b) => {
      return a.original.name.localeCompare(
        b.original.name,
      )
    },
  },

  {
    accessorKey: 'description',

    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader title="Description" column={column} />
    ),
    cell: ({ row }) => {
      const description = row.original.description || '';
      const truncatedDescription = description.length > 50
        ? `${description.substring(0, 50)}...`
        : description;

      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <p className="truncate max-w-xs">
                {truncatedDescription}
              </p>
            </TooltipTrigger>
            {description.length > 50 && (
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    },
    meta: {
      nameInViewFilter: 'Description',
    },
    filterFn: (row, _id, value) => {
      const description = row.original.description || '';
      return description.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: 'totalRecipeCount',
    header: ({ column }) => (
      <DataTableColumnHeader title="Recipe Count" column={column} />
    ),
    cell: ({ row }) => {
      const totalRecipeCount = row.original.totalRecipeCount
      return totalRecipeCount === 1 ? `1 recipe` : `${row.original.totalRecipeCount} recipes`
    },

    meta: {
      nameInViewFilter: 'Recipe Count',
    },
  },

]
