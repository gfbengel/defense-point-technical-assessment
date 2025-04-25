import { RecipeWithIngredients } from "@/domain/entities/value-objects/recipe-with-ingredients";

export class RecipeWithIngredientsPresenter {
  static toHTTP(recipe: RecipeWithIngredients) {
    return {
      id: recipe.id.toString(),
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,
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