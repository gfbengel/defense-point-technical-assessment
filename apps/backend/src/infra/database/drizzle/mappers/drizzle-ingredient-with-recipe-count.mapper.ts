import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { IngredientWithRecipeCount } from '@/domain/entities/value-objects/ingredient-with-recipe-count'
import { IngredientWithRecipeCountSchema } from 'drizzle/schema/extended/ingredient-with-recipe-count'


export class DrizzleIngredientWithRecipeCountMapper {
  static toDomain(raw: IngredientWithRecipeCountSchema): IngredientWithRecipeCount {

    return IngredientWithRecipeCount.create(
      {
        id: new UniqueEntityId(raw.id),
        name: raw.name,
        description: raw.description,
        totalRecipeCount: raw.totalRecipeCount,
      }
    )
  }

}
