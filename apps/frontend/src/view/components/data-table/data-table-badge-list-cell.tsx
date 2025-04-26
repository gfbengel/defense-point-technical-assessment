
import { cn } from '@/lib/utils/cn'

import { Badge } from '../ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';



interface IDataTableBadgeListCellProps {
  items: string[]
  className?: string
  maxItems?: number
}

export function DataTableBadgeListCell({
  items,
  className,
  maxItems = 1,
}: IDataTableBadgeListCellProps) {



  if (items.length === 0) {
    return '-'
  }

  const truncatedItems = items.slice(0, maxItems)
  const restItems = items.slice(maxItems)

  const badgeClasses = cn("px-1 font-normal", className)

  return (
    <div className="items-center flex flex-wrap gap-1">
      {truncatedItems.map((item) => (
        <Badge
          variant="secondary"
          key={item}
          className={badgeClasses}
        >
          {item}
        </Badge>
      ))}
      {restItems.length > 0 && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Badge variant="secondary" className={cn(badgeClasses, "cursor-pointer")}>
              + {restItems.length}
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2 px-1 py-1.5">
              <p className='text-sm font-medium'>Demais categorias</p>
              <div className="flex flex-row flex-wrap gap-2">
                {restItems.map((item) => (
                  <Badge key={item} variant="secondary" className={badgeClasses}>
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );

}
