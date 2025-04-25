import { RecipeWithIngredients } from "@/domain/entities/value-objects/recipe-with-ingredients";

export class RecipeWithIngredientsPresenter {
  static toHTTP(recipe: RecipeWithIngredients) {
    return {
      id: recipe.id.toString(),
      title: recipe.title,
      description: recipe.description,
      isFavorite: recipe.isFavorite,
      ingredients: recipe.ingredients.map(ingredient => ({
        id: ingredient.id.toString(),
        name: ingredient.name,
      })),
      timeToCookInMinutes: recipe.timeToCookInMinutes,

    }
  }
}