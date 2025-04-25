import { RecipeWithDetails } from "@/domain/entities/value-objects/recipe-with-details";

export class RecipeWithDetailsPresenter {
  static toHTTP(recipe: RecipeWithDetails) {
    return {
      id: recipe.id.toString(),
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,
      isFavorite: recipe.isFavorite,
      ingredients: recipe.ingredients.map(ingredient => ({
        id: ingredient.id.toString(),
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
      timeToCookInMinutes: recipe.timeToCookInMinutes,

    }
  }
}