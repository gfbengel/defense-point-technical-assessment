import { Recipe } from "@/domain/entities/recipe";

export class RecipePresenter {
  static toHTTP(recipe: Recipe) {
    return {
      id: recipe.id.toString(),
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,

      timeToCookInMinutes: recipe.timeToCookInMinutes,

    }
  }
}