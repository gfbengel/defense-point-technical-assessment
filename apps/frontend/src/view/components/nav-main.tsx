import { createLink, LinkComponent, useLocation, useNavigate } from "@tanstack/react-router"
import { type LucideIcon, MoreHorizontal } from "lucide-react"

import { FileRoutesByTo } from "@/routeTree.gen"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/view/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/view/components/ui/sidebar"





const CreatedLinkComponent = createLink(SidebarMenuSubButton)

export const CustomLink: LinkComponent<typeof SidebarMenuSubButton> = (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />
}


// Type for valid route paths
type ValidRoutePath = keyof FileRoutesByTo

export interface MenuItemProps {
  to: ValidRoutePath
  label: string
  actions?: Array<{
    to: ValidRoutePath
    label: string
  }>
}

export interface NavMainItemProps {
  title: string
  icon?: LucideIcon
  options: MenuItemProps[]
}

export function NavMain({
  items, label
}: {
  items: NavMainItemProps[]
  label?: string
}) {

  const location = useLocation()
  const navigate = useNavigate()
  return (
    <SidebarGroup>
      {!!label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="pointer-events-none" >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {item.options?.map((option) => {
                  const isActive = option.to === location.pathname
                  const { label, actions, ...rest } = option
                  return (
                    <SidebarMenuSubItem key={label}>
                      <CustomLink {...rest} isActive={isActive}>
                        <span>{option.label}</span>
                      </CustomLink>
                      {actions && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild >
                            <SidebarMenuAction>
                              <MoreHorizontal />
                            </SidebarMenuAction>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start">
                            {actions?.map((action) => (
                              <DropdownMenuItem
                                key={action.label + action.to}
                                onSelect={() => navigate({ to: action.to })}
                              >

                                {action.label}

                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

