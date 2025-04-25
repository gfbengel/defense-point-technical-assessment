
import { localStorageKeys } from "./lib/config/local-storage-keys"
import { BreadcrumbsProvider } from "./view/components/breadcrumbs-navbar"
import { ThemeProvider } from "./view/components/theme-provider"


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey={localStorageKeys.THEME}>
      <BreadcrumbsProvider>
        {children}
      </BreadcrumbsProvider>
    </ThemeProvider>

  )
}
