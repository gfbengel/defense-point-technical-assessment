import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Ingredient } from "@/domain/entities/ingredient";
import { IngredientInsertSchema } from "drizzle/schema/tables/ingredients";

export class DrizzleIngredientMapper {

  static toDomain(ingredient: IngredientInsertSchema) {
    return Ingredient.create(
      {
        name: ingredient.name,
        description: ingredient.description,
        createdAt: ingredient.createdAt,
        updatedAt: ingredient.updatedAt,
      },
      new UniqueEntityId(ingredient.id)
    )
  }

  static toDrizzle(ingredient: Ingredient) {
    return {
      id: ingredient.id.toString(),
      name: ingredient.name,
      description: ingredient.description,
      createdAt: ingredient.createdAt,
      updatedAt: ingredient.updatedAt,
    }
  }
}