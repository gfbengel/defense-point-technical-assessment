export interface RecipeWithDetails {
  id: string
  title: string
  description: string
  instructions: string
  isFavorite: boolean
  image: string
  ingredients: {
    id: string
    name: string
    quantity: number
    unit: string
  }[]
  timeToCookInMinutes: number
}
