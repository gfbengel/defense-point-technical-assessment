'use client'

import { Moon, Sun, SunMoon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu'

import { useTheme } from './theme-provider'
import { SidebarMenuButton } from './ui/sidebar'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from './ui/visually-hidden'


export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-10 w-10">
          <span className="block size-5">
            <SunMoon
              className={cn(
                'size-5 transition-all',
              )}
            />
          </span>
          <VisuallyHidden>Switch theme</VisuallyHidden>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mx-2 mb-1 w-36">
        <DropdownMenuItem
          className={cn(
            'flex items-center justify-between data-[selected=true]:font-semibold',
            theme === 'dark' ? 'font-semibold' : 'font-normal',
          )}
          onSelect={() => setTheme('dark')}
        >
          Dark
          <Moon className="h-5 w-5" />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            'flex items-center justify-between data-[selected=true]:font-semibold',
            theme === 'light' ? 'font-semibold' : 'font-normal',
          )}
          onSelect={() => setTheme('light')}
        >
          Light
          <Sun className="h-5 w-5" />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            'flex items-center justify-between data-[selected=true]:font-semibold',
            theme === 'system' ? 'font-semibold' : 'font-normal',
          )}
          onSelect={() => setTheme('system')}
        >
          System
          <SunMoon className="h-5 w-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
