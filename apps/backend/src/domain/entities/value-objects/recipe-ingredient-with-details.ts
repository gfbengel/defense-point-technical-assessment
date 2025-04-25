import { ValueObject } from "@/core/entities/value-object"

import { RecipeIngredientProps } from "../recipe-ingredient"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface RecipeIngredientWithDetailsProps extends RecipeIngredientProps {
  id: UniqueEntityId
  name: string
}


export class RecipeIngredientWithDetails extends ValueObject<RecipeIngredientWithDetailsProps> {

  get id() {
    return this.props.id
  }

  get recipeId() {
    return this.props.recipeId
  }

  get ingredientId() {
    return this.props.ingredientId
  }

  get quantity() {
    return this.props.quantity
  }

  get unit() {
    return this.props.unit
  }

  get name() {
    return this.props.name
  }

  static create(props: RecipeIngredientWithDetailsProps) {
    const recipeIngredientWithDetails = new RecipeIngredientWithDetails(props)
    return recipeIngredientWithDetails
  }
}
