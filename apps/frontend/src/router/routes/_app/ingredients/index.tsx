import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { createPaginationSchema } from '@/lib/schemas/pagination.schema'

import { RootRouterContext } from '../../__root'
import { IngredientsPage } from '@/view/pages/ingredients'
import { FetchIngredientsResponse } from '@/lib/services/ingredients-service/fetch-ingredients'
import { ingredientsQueryOptions } from '@/lib/hooks/queries/use-ingredients-query'

const ingredientsFiltersSchema = z.object({
  name: z.string().optional(),
})


// Create the pagination schema with the user filters
export const pageQueryParamSchema = createPaginationSchema(ingredientsFiltersSchema)


export interface LoaderData<T = undefined> {
  data?: T
  isCreateRoute: boolean
  isEditRoute: boolean
}


export const Route = createFileRoute('/_app/ingredients/')({
  component: IngredientsPage,
  validateSearch: (search) => pageQueryParamSchema.parse(search),
  loaderDeps: ({ search }) => ({
    ...search
  }),
  loader: async ({ context, deps }): Promise<LoaderData<FetchIngredientsResponse>> => {


    const { queryClient } = context as RootRouterContext

    const data = await queryClient.ensureQueryData(ingredientsQueryOptions({
      ...deps,
      filters: (deps.filters && Object.keys(deps.filters).length > 0) ? deps.filters : undefined
    }))

    return {
      data,
      isCreateRoute: false,
      isEditRoute: false,
    }
  }
})
