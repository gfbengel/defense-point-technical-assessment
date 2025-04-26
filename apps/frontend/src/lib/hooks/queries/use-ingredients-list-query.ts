import { queryOptions, useQuery, UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { Times } from "@/lib/config/times-enum"
import { IngredientWithRecipeCount } from "@/lib/entities/ingredient-with-recipe-count"
import { ingredientsService } from "@/lib/services/ingredients-service"
import { ListIngredientsResponse } from "@/lib/services/ingredients-service/list-ingredients"



type UseIngredientListQueryOptions = Omit<
  UseQueryOptions<ListIngredientsResponse, Error>,
  'queryKey' | 'queryFn'
>


export const ingredientsQueryOptions = (options?: UseIngredientListQueryOptions) => queryOptions({
  queryKey: ['ingredients', 'list'],
  queryFn: () => ingredientsService.listIngredients(),
  ...options,
  staleTime: Times.ONE_HOUR_IN_MS * 5, // 5 hours
})



export function useIngredientListQuery(
  options?: UseIngredientListQueryOptions,
) {
  const { data, isFetching, isLoading, refetch, error, isError } = useQuery<
    ListIngredientsResponse,
    Error
  >(ingredientsQueryOptions(options))

  return {
    error,
    isError,
    ingredients: data ? data.ingredients : ([] as IngredientWithRecipeCount[]),
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchIngredients: refetch,
  }
}


export function useIngredientListQuerySuspense(options?: UseIngredientListQueryOptions) {
  const { data, isFetching, isLoading, refetch, error, isError } = useSuspenseQuery(ingredientsQueryOptions(options))

  return {
    error,
    isError,
    ingredients: data.ingredients,
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchIngredients: refetch,
  }
}
