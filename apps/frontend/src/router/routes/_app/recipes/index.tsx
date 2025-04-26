import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { createPaginationSchema } from '@/lib/schemas/pagination.schema'

import { RootRouterContext } from '../../__root'
import { RecipesPage } from '@/view/pages/recipes'
import { FetchRecipesResponse } from '@/lib/services/recipes-service/fetch-recipes'
import { recipesQueryOptions } from '@/lib/hooks/queries/use-recipes-query'


const recipesFiltersSchema = z.object({
  name: z.string().optional(),
  ingredientIds: z.array(z.string()).optional(),
})


// Create the pagination schema with the user filters
export const pageQueryParamSchema = createPaginationSchema(recipesFiltersSchema)


export const Route = createFileRoute('/_app/recipes/')({
  component: RecipesPage,
  validateSearch: (search) => pageQueryParamSchema.parse(search),
  loaderDeps: ({ search }) => ({
    ...search
  }),
  loader: async ({ context, deps }): Promise<FetchRecipesResponse> => {


    const { queryClient } = context as RootRouterContext

    const data = await queryClient.ensureQueryData(recipesQueryOptions({
      ...deps,
      filters: (deps.filters && Object.keys(deps.filters).length > 0) ? deps.filters : undefined
    }))

    return data
  }
})
