import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import React from 'react'

import { env } from '@/lib/env'
import { queryClient } from '@/lib/services/query-client'
import { NotFoundPage } from '@/view/pages/not-found'

export interface RootRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext

  queryClient: typeof queryClient
}

const TanStackRouterDevtools =
  env.MODE === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )


export const Route = createRootRouteWithContext<RootRouterContext>()({

  notFoundComponent: NotFoundPage,
  head: () => ({
    title: 'Mirador',
    meta: [],
    links: [],
    scripts: [],
  }),
  component: () => (
    <>

      <HeadContent />

      <Outlet />
      <TanStackRouterDevtools position='bottom-right' />
      <Scripts />
    </>
  ),
})

