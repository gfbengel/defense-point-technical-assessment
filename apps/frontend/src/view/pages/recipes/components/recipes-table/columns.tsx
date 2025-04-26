import type { ColumnDef } from '@tanstack/react-table'

import { RecipeWithIngredients } from '@/lib/entities/recipe-with-ingredients'
import { DataTableBadgeListCell } from '@/view/components/data-table/data-table-badge-list-cell'
import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header'
import { DataTableIdCell } from '@/view/components/data-table/data-table-id-cell'
import { TooltipContent } from '@/view/components/ui/tooltip'
import { TooltipProvider, TooltipTrigger } from '@/view/components/ui/tooltip'
import { Tooltip } from '@/view/components/ui/tooltip'
import { formatTime } from '@/lib/utils/format-time'
import { Link } from '@tanstack/react-router'
import { Button } from '@/view/components/ui/button'
import { EyeIcon } from 'lucide-react'


export const columns: ColumnDef<RecipeWithIngredients>[] = [
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
    accessorKey: 'title',
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Title"
        column={column}
      />
    ),
    cell: ({ row }) => {
      return (<Button variant="link" asChild>
        <Link to={`/recipes/${row.original.id}`}>
          <EyeIcon className="size-4" />

          {row.original.title}
        </Link></Button>)
    },
    meta: {
      nameInViewFilter: 'Title',
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

  },
  {
    accessorKey: 'timeToCookInMinutes',
    header: ({ column }) => (
      <DataTableColumnHeader title="Time to Cook" column={column} />
    ),
    cell: ({ row }) => {
      return `${formatTime(row.original.timeToCookInMinutes)}`
    },
    meta: {
      nameInViewFilter: 'Time to Cook',
    },
  },
  {
    accessorKey: 'totalIngredientCount',
    header: ({ column }) => (
      <DataTableColumnHeader title="Ingredient Count" column={column} />
    ),
    cell: ({ row }) => {
      return row.original.totalIngredientCount
    },

    meta: {
      nameInViewFilter: 'Ingredients Count',
    },
  },
  {
    accessorKey: 'ingredients',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader title="Ingredients" column={column} />
    ),
    cell: ({ row }) => {
      return <DataTableBadgeListCell items={row.original.ingredients.map((ingredient) => ingredient.name)} />
    },
    meta: {
      nameInViewFilter: 'Ingredients',
    },
  },
  {
    accessorKey: 'ingredientIds',
    enableHiding: false,
  },

]
