

import {
  getRouteApi,
  RegisteredRouter,
  RouteIds,
  SearchParamOptions,
} from "@tanstack/react-router";
import { useCallback } from "react";

import { PageSizeType, SortByType } from "../config/pagination-params";
import { cleanEmptyParams } from "../utils/clean-empty-params";

export type RouteId = RouteIds<RegisteredRouter["routeTree"]>


export function useFilters<
  TId extends RouteId,
  TSearchParams extends SearchParamOptions<
    RegisteredRouter,
    TId,
    TId
  >["search"],
>(routeId: TId) {
  const routeApi = getRouteApi<TId>(routeId);
  const navigate = routeApi.useNavigate();
  const filters = routeApi.useSearch();


  const setFilters = useCallback((partialFilters: Partial<TSearchParams>) => {

    const newSearch = cleanEmptyParams({
      ...filters,
      filters: {
        ...(filters as any).filters,
        ...partialFilters,
      },
    }) as TSearchParams

    return navigate({
      search: ((prev: any) => {

        const prevFilters = JSON.stringify(prev.filters);
        const newFilters = JSON.stringify((newSearch as any).filters);

        if (prevFilters !== newFilters) {
          return {
            ...(newSearch as any),
            page: 1,
          }
        }

        return newSearch
      }) as any
    })
  }, [filters, navigate])


  const setSortBy = (sortBy: SortByType) =>
    navigate({
      search: ((prev: any) => cleanEmptyParams({
        ...prev,
        sortBy,
      })) as any,
    })


  const setPageSize = (pageSize: PageSizeType) =>
    navigate({
      search: ((prev: any) => {
        return cleanEmptyParams({
          ...prev,
          pageSize,
          page: 1 // Reset to page 1 when changing page size
        })
      }) as any,
    })

  const setPage = (page: number) => {

    return navigate({
      search: ((prev: typeof filters) => {

        const cleaned = cleanEmptyParams({
          ...prev,
          page,
        })
        return cleaned
      }) as any,
    })
  }

  // const resetFilters = () => navigate({ search: {} as TSearchParams });
  const resetFilters = () => navigate({
    search: ((prev: any) => cleanEmptyParams({
      // ...prev,
      page: 1,
      pageSize: prev.pageSize,

    })) as any,
  });

  return { filters, setFilters, resetFilters, setPageSize, setPage, setSortBy };
}
