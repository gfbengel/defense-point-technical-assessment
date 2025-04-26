
import { QueryClientProvider } from "@tanstack/react-query"
import { localStorageKeys } from "./lib/config/local-storage-keys"
import { queryClient } from "./lib/services/query-client"
import { BreadcrumbsProvider } from "./view/components/breadcrumbs-navbar"
import { ThemeProvider } from "./view/components/theme-provider"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey={localStorageKeys.THEME}>
      <QueryClientProvider client={queryClient}>
        <BreadcrumbsProvider>
          {children}
        </BreadcrumbsProvider>
        <ReactQueryDevtools buttonPosition="top-left" />

      </QueryClientProvider>
    </ThemeProvider>

  )
}
