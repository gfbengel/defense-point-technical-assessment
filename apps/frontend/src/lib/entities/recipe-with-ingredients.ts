export interface RecipeWithIngredients {
  id: string
  title: string
  description: string
  isFavorite: boolean
  ingredients: {
    id: string
    name: string
  }[]
  timeToCookInMinutes: number
  totalIngredientCount: number
}
