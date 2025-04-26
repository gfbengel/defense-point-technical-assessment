import { createRouter } from "@tanstack/react-router"

import { queryClient } from "@/lib/services/query-client"
import { routeTree } from "@/routeTree.gen"

import { RootRouterContext } from "./routes/__root"

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  } as RootRouterContext,
})

export { router }
