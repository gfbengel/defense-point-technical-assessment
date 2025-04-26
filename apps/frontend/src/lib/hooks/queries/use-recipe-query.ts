import { queryOptions, useQuery, UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { Times } from "@/lib/config/times-enum"

import { GetRecipeParams } from "@/lib/services/recipes-service/get-recipe"
import { GetRecipeResponse } from "@/lib/services/recipes-service/get-recipe"
import { recipesService } from "@/lib/services/recipes-service"
import { RecipeWithDetails } from "@/lib/entities/recipe-with-details"


type UseRecipeQueryProps = GetRecipeParams



type UseRecipeQueryOptions = Omit<
  UseQueryOptions<GetRecipeResponse, Error>,
  'queryKey' | 'queryFn'
>


export const recipeQueryOptions = (params: UseRecipeQueryProps, options?: UseRecipeQueryOptions) => queryOptions({
  queryKey: ['recipe', params.recipeId],
  queryFn: () => recipesService.getRecipe(params),
  ...options,
  staleTime: Times.ONE_HOUR_IN_MS * 5, // 5 hours
})



export function useRecipeQuery(
  params: UseRecipeQueryProps,
  options?: UseRecipeQueryOptions,
) {
  const { data, isFetching, isLoading, refetch, error, isError } = useQuery<
    GetRecipeResponse,
    Error
  >(recipeQueryOptions(params, options))

  return {
    error,
    isError,
    recipe: data ? data.recipe : ({} as RecipeWithDetails),
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchRecipe: refetch,
  }
}


export function useRecipeQuerySuspense(params: UseRecipeQueryProps) {
  const { data, isFetching, isLoading, refetch, error, isError } = useSuspenseQuery(recipeQueryOptions(params))

  return {
    error,
    isError,
    recipe: data.recipe,
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchRecipe: refetch,
  }
}
