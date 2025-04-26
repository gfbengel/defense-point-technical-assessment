
import { RecipeWithIngredients } from "@/domain/entities/value-objects/recipe-with-ingredients";
import { RecipeWithIngredientsSchema } from "drizzle/schema/extended/recipe-with-ingredients";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";




export class DrizzleRecipeWithIngredientsMapper {
  static toDomain(recipe: RecipeWithIngredientsSchema) {
    return RecipeWithIngredients.create(
      {
        id: new UniqueEntityId(recipe.id),
        title: recipe.title,
        description: recipe.description,
        timeToCookInMinutes: recipe.timeToCookInMinutes,
        image: recipe.image,
        isFavorite: recipe.isFavorite,
        ingredients: recipe.ingredients.map(ingredient => ({
          id: new UniqueEntityId(ingredient.id),
          name: ingredient.name,
        })),
        totalIngredientCount: recipe.totalIngredientCount
      }
    )
  }
}