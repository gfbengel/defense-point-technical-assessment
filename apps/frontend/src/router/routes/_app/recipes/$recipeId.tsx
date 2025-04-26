

import { createFileRoute } from '@tanstack/react-router'


import { RootRouterContext } from '../../__root'
import { RecipeDetailsPage } from '@/view/pages/recipe-details'
import { GetRecipeResponse } from '@/lib/services/recipes-service/get-recipe'
import { recipeQueryOptions } from '@/lib/hooks/queries/use-recipe-query'

export const Route = createFileRoute('/_app/recipes/$recipeId')({
  component: RecipeDetailsPage,

  loader: async ({ params, context }): Promise<GetRecipeResponse> => {


    const { queryClient } = context as RootRouterContext

    const { recipeId } = params

    const data = await queryClient.ensureQueryData(recipeQueryOptions({
      recipeId: recipeId
    }))

    return data
  }
})
