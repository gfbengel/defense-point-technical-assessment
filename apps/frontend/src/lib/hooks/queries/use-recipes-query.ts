import { queryOptions, useQuery, UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { RecipeWithIngredients } from "@/lib/entities/recipe-with-ingredients"
import { Times } from "@/lib/config/times-enum"
import { FetchRecipesParams, FetchRecipesResponse } from "@/lib/services/recipes-service/fetch-recipes"
import { recipesService } from "@/lib/services/recipes-service"


type UseRecipesQueryProps = FetchRecipesParams



type UseRecipesQueryOptions = Omit<
  UseQueryOptions<FetchRecipesResponse, Error>,
  'queryKey' | 'queryFn'
>


export const recipesQueryOptions = (params: UseRecipesQueryProps, options?: UseRecipesQueryOptions) => queryOptions({
  queryKey: ['recipes', params],
  queryFn: () => recipesService.fetchRecipes(params),
  ...options,
  staleTime: Times.ONE_HOUR_IN_MS * 5, // 5 hours
})



export function useRecipesQuery(
  params: UseRecipesQueryProps,
  options?: UseRecipesQueryOptions,
) {
  const { data, isFetching, isLoading, refetch, error, isError } = useQuery<
    FetchRecipesResponse,
    Error
  >(recipesQueryOptions(params, options))

  return {
    error,
    isError,
    recipes: data ? data.recipes : ([] as RecipeWithIngredients[]),
    totalRowsCount: data ? data.totalRowsCount : 0,
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchRecipes: refetch,
  }
}


export function useRecipesQuerySuspense(params: UseRecipesQueryProps) {
  const { data, isFetching, isLoading, refetch, error, isError } = useSuspenseQuery(recipesQueryOptions(params))

  return {
    error,
    isError,
    recipes: data.recipes,
    totalRowsCount: data.totalRowsCount,
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchRecipes: refetch,
  }
}
