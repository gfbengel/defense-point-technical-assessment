import type { Row } from '@tanstack/react-table'

import { cn } from '@/lib/utils/cn'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

interface IDataTableIdCellProps<T extends { id: string }> {
  row: Row<T>
  className?: string
}

export function DataTableIdCell<T extends { id: string }>({
  row,
  className,
}: IDataTableIdCellProps<T>) {


  const id = row.original.id;
  const truncatedId = `${id.substring(0,
    4)}...${id.substring(id.length - 6)}`;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <p className={cn("relative font-mono text-xs text-muted-foreground overflow-hidden w-26", className)}
          >
            {truncatedId}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-mono">{id}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

}
