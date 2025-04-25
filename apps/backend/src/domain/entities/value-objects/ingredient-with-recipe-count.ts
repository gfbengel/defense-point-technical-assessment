import { ValueObject } from "@/core/entities/value-object"
import { UniqueEntityId } from "@core/entities/unique-entity-id"


interface IngredientWithRecipeCountProps {
  id: UniqueEntityId
  name: string
  description?: string | null
  totalRecipeCount: number
}

export class IngredientWithRecipeCount extends ValueObject<IngredientWithRecipeCountProps> {

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get totalRecipeCount() {
    return this.props.totalRecipeCount
  }

  static create(props: IngredientWithRecipeCountProps) {
    return new IngredientWithRecipeCount(props)
  }

}
