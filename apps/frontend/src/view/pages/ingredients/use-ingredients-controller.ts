import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

import { useIngredientsQuerySuspense } from "@/lib/hooks/queries/use-ingredients-query"

import { useBreadcrumbs } from "@/view/components/breadcrumbs-navbar"
import { useFilters } from "@/lib/hooks/use-filters"


export function useIngredientsController() {

  const navigate = useNavigate()

  const { filters } = useFilters('/_app/ingredients/')

  const { setBreadcrumbs } = useBreadcrumbs()

  const { ingredients, totalRowsCount } = useIngredientsQuerySuspense(
    filters

  )


  useEffect(() => {
    setBreadcrumbs([
      { label: 'General' },
      { label: 'Ingredients' },
      { label: 'List' },
    ])
  }, [setBreadcrumbs])


  return {
    ingredients,
    totalRowsCount,
    navigate,
    filters
  }
}