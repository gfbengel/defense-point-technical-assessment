import { UniqueEntityId } from "@/core/entities/unique-entity-id";

import { Recipe } from "@/domain/entities/recipe";
import { RecipeInsertSchema } from "drizzle/schema/tables/recipes";

export class DrizzleRecipeMapper {

  static toDomain(recipe: RecipeInsertSchema) {
    return Recipe.create(
      {
        title: recipe.title,
        description: recipe.description,
        instructions: recipe.instructions,
        timeToCookInMinutes: recipe.timeToCookInMinutes,
        image: recipe.image,
        isFavorite: recipe.isFavorite,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      },
      new UniqueEntityId(recipe.id)
    )
  }

  static toDrizzle(recipe: Recipe) {
    return {
      id: recipe.id.toString(),
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,
      timeToCookInMinutes: recipe.timeToCookInMinutes,
      image: recipe.image,
      isFavorite: recipe.isFavorite,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    }
  }
}