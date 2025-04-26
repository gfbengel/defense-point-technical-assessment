import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

import { useBreadcrumbs } from "@/view/components/breadcrumbs-navbar"
import { useFilters } from "@/lib/hooks/use-filters"
import { useRecipesQuerySuspense } from "@/lib/hooks/queries/use-recipes-query"

export function useRecipesController() {

  const navigate = useNavigate()

  const { filters } = useFilters('/_app/recipes/')

  const { setBreadcrumbs } = useBreadcrumbs()

  const { recipes, totalRowsCount } = useRecipesQuerySuspense(
    filters

  )


  useEffect(() => {
    setBreadcrumbs([
      { label: 'General' },
      { label: 'Recipes' },
      { label: 'List' },
    ])
  }, [setBreadcrumbs])


  return {
    recipes,
    totalRowsCount,
    navigate,
    filters
  }
}