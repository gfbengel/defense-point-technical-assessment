import { useNavigate, useParams } from "@tanstack/react-router"
import { useEffect } from "react"

import { useBreadcrumbs } from "@/view/components/breadcrumbs-navbar"
import { useRecipeQuerySuspense } from "@/lib/hooks/queries/use-recipe-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { recipesService } from "@/lib/services/recipes-service"

export function useRecipeDetailsController() {

  const navigate = useNavigate()


  const { setBreadcrumbs } = useBreadcrumbs()

  const { recipeId } = useParams({ from: '/_app/recipes/$recipeId' })


  const { recipe } = useRecipeQuerySuspense({ recipeId: recipeId })

  const queryClient = useQueryClient()



  const { mutateAsync, isPending: isLoadingMutation } = useMutation({
    mutationFn: async () => {
      return recipesService.toggleFavoriteStatus({ recipeId })
    },
    onSuccess: () => {
      if (recipe.isFavorite) {
        toast.success('Recipe removed from favorites!')
      } else {
        toast.success('Recipe added to favorites!')
      }
      queryClient.invalidateQueries({ queryKey: ['recipe', recipeId] })
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    },
  })



  useEffect(() => {
    setBreadcrumbs([
      { label: 'General' },
      { label: 'Recipes' },
      { label: recipe.title },
    ])
  }, [setBreadcrumbs, recipe])


  return {
    recipe,
    navigate,
    isLoadingMutation,
    toggleFavoriteStatus: mutateAsync,
  }
}