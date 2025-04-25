import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import { generateEntityTimestamps } from "@/core/utils/generate-entity-timestamps"

export interface IngredientProps {
  name: string
  description?: string | null

  createdAt: Date
  updatedAt: Date

}


export class Ingredient extends Entity<IngredientProps> {

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<IngredientProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityId) {
    const ingredient = new Ingredient(generateEntityTimestamps(props), id)

    return ingredient
  }
}
