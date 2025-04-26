import { PaginationState, Updater } from "@tanstack/react-table";

import { PageSizeType } from "../config/pagination-params";


type DefaultOnPaginationChangeProps = {
  setFilters: (filters: any) => void
  paginationState: PaginationState
}

export function defaultOnPaginationChange({ setFilters, paginationState }: DefaultOnPaginationChangeProps) {

  return (pagination: Updater<PaginationState>) => {

    const newPagination = typeof pagination === "function"
      ? pagination(paginationState)
      : pagination

    setFilters(
      {
        page: newPagination.pageIndex + 1,
        pageSize: newPagination.pageSize as PageSizeType,
      }
    );
  }
}
