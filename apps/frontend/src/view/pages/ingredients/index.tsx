
import { IngredientsTable } from "./components/ingredients-table"
import { PageHeader } from "@/view/components/page-header"
import { TypographyH1 } from "@/view/components/ui/typography-h1"
import { useIngredientsController } from "./use-ingredients-controller"




export function IngredientsPage() {

  const {
    ingredients,
    totalRowsCount,
  } = useIngredientsController()

  return (


    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-4">
      <PageHeader>
        <TypographyH1>Ingredients</TypographyH1>

      </PageHeader>
      <IngredientsTable
        ingredients={ingredients}
        totalRowsCount={totalRowsCount}
      />
    </div >

  )
}

