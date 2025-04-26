import { AppSidebar } from "@/view/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/view/components/ui/sidebar'
import { BreadcrumbsNavbar } from '@/view/components/breadcrumbs-navbar'
import { Outlet } from "@tanstack/react-router"

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset >
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 " />

            <BreadcrumbsNavbar />
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
