import * as React from "react"


import { NavMain } from "@/view/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/view/components/ui/sidebar"
import { ThemeSwitcher } from "./theme-switcher"
import { appMenu } from "@/lib/config/app-menu"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        Recipes
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={appMenu} />

      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row items-center gap-1">

          <ThemeSwitcher />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
