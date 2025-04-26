
// import { RecipesTable } from "./components/recipes-table"
import { PageHeader } from "@/view/components/page-header"
import { TypographyH1 } from "@/view/components/ui/typography-h1"
import { useRecipeDetailsController } from "./use-recipe-details-controller"
import { StarIcon, Loader2Icon } from "lucide-react"
import { Button } from "@/view/components/ui/button"
import { cn } from "@/lib/utils"
import { TypographyH2 } from "@/view/components/ui/typography-h2"




export function RecipeDetailsPage() {


  const { recipe, toggleFavoriteStatus, isLoadingMutation } = useRecipeDetailsController()

  return (


    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-4">
      <div className="flex flex-col gap-2">
        <img src={recipe.image} alt={recipe.title} className="mx-auto max-w-full w-[1200px] max-h-[300px] h-auto object-cover rounded-xl" />
        <PageHeader >
          <TypographyH1>{recipe.title}</TypographyH1>

          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => toggleFavoriteStatus()}
            disabled={isLoadingMutation}
          >
            {isLoadingMutation ? <Loader2Icon className="size-8 animate-spin" /> :
              <StarIcon className={cn(
                "size-8 transition-all duration-300",
                recipe.isFavorite && "text-yellow-500 fill-yellow-500"
              )} />
            }
          </Button>
        </PageHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <p>{recipe.description}</p>
            <TypographyH2 className="mt-2">Ingredients</TypographyH2>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name} - {ingredient.quantity} {ingredient.unit}</li>
              ))}
            </ul>
            <TypographyH2 className="mt-2">
              How to prepare
            </TypographyH2>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div >

  )
}

