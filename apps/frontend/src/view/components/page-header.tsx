import { cn } from "@/lib/utils"

type PageHeaderProps = React.ComponentProps<"div">
export function PageHeader({ children, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col gap-2 ",
      "md:flex-row md:items-center md:justify-between mb-4",
      className
    )}
      {...props}
    >
      {children}
    </div>
  )
}