import { queryOptions, useQuery, UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { FetchIngredientsResponse } from "@/lib/services/ingredients-service/fetch-ingredients"
import { FetchIngredientsParams } from "@/lib/services/ingredients-service/fetch-ingredients"
import { ingredientsService } from "@/lib/services/ingredients-service"
import { IngredientWithRecipeCount } from "@/lib/entities/ingredient-with-recipe-count"
import { Times } from "@/lib/config/times-enum"


type UseIngredientsQueryProps = FetchIngredientsParams



type UseIngredientsQueryOptions = Omit<
  UseQueryOptions<FetchIngredientsResponse, Error>,
  'queryKey' | 'queryFn'
>


export const ingredientsQueryOptions = (params: UseIngredientsQueryProps, options?: UseIngredientsQueryOptions) => queryOptions({
  queryKey: ['ingredients', params],
  queryFn: () => ingredientsService.fetchIngredients(params),
  ...options,
  staleTime: Times.ONE_HOUR_IN_MS * 5, // 5 hours
})



export function useIngredientsQuery(
  params: UseIngredientsQueryProps,
  options?: UseIngredientsQueryOptions,
) {
  const { data, isFetching, isLoading, refetch, error, isError } = useQuery<
    FetchIngredientsResponse,
    Error
  >(ingredientsQueryOptions(params, options))

  return {
    error,
    isError,
    ingredients: data ? data.ingredients : ([] as IngredientWithRecipeCount[]),
    totalRowsCount: data ? data.totalRowsCount : 0,
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchIngredients: refetch,
  }
}


export function useIngredientsQuerySuspense(params: UseIngredientsQueryProps) {
  const { data, isFetching, isLoading, refetch, error, isError } = useSuspenseQuery(ingredientsQueryOptions(params))

  return {
    error,
    isError,
    ingredients: data.ingredients,
    totalRowsCount: data.totalRowsCount,
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchIngredients: refetch,
  }
}
