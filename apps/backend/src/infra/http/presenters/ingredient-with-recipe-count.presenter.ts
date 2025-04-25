import { IngredientWithRecipeCount } from "@/domain/entities/value-objects/ingredient-with-recipe-count";

export class IngredientWithRecipeCountPresenter {
  static toHTTP(ingredient: IngredientWithRecipeCount) {
    return {
      id: ingredient.id.toString(),
      name: ingredient.name,
      description: ingredient.description,
      totalRecipeCount: ingredient.totalRecipeCount,
    }
  }
}