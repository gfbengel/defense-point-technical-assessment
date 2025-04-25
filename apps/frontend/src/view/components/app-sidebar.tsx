import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/view/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/view/components/ui/sidebar"
import { ThemeSwitcher } from "./theme-switcher"

// This is sample data.
const data = {

  navMain: [
    {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Ingredients",
          url: "#",
        },
        {
          title: "Recipes",
          url: "#",
        },
        {
          title: "Favorites",
          url: "#",
        },
      ],
    },

  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        Recipes
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row items-center gap-1">

          <ThemeSwitcher />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
