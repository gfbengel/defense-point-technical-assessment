
// import { RecipesTable } from "./components/recipes-table"
import { PageHeader } from "@/view/components/page-header"
import { TypographyH1 } from "@/view/components/ui/typography-h1"
import { useRecipesController } from "./use-recipes-controller"
import { RecipesTable } from "./components/recipes-table"




export function RecipesPage() {

  const {
    recipes,
    totalRowsCount,
  } = useRecipesController()

  return (


    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-4">
      <PageHeader>
        <TypographyH1>Recipes</TypographyH1>

      </PageHeader>
      <RecipesTable
        recipes={recipes}
        totalRowsCount={totalRowsCount}
      />
    </div >

  )
}

