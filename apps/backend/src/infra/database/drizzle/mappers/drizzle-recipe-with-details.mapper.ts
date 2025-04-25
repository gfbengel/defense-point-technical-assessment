import { RecipeIngredientWithDetails } from "@/domain/entities/value-objects/recipe-ingredient-with-details";
import { RecipeWithDetails } from "@/domain/entities/value-objects/recipe-with-details";
import { RecipeWithDetailsSchema } from "drizzle/schema/extended/recipe-with-details";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";




export class DrizzleRecipeWithDetailsMapper {
  static toDomain(recipe: RecipeWithDetailsSchema) {
    return RecipeWithDetails.create(
      {
        id: new UniqueEntityId(recipe.id),
        title: recipe.title,
        description: recipe.description,
        instructions: recipe.instructions,
        timeToCookInMinutes: recipe.timeToCookInMinutes,
        image: recipe.image,
        isFavorite: recipe.isFavorite,
        ingredients: recipe.ingredients.map(ingredient => RecipeIngredientWithDetails.create({
          id: new UniqueEntityId(ingredient.id),
          recipeId: new UniqueEntityId(ingredient.recipeId),
          ingredientId: new UniqueEntityId(ingredient.ingredientId),
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          name: ingredient.name,
        })),

        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      }
    )
  }
}