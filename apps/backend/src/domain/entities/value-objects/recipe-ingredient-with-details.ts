import { ValueObject } from "@/core/entities/value-object"

import { RecipeIngredientProps } from "../recipe-ingredient"

interface RecipeIngredientWithDetailsProps extends RecipeIngredientProps {
  name: string
}


export class RecipeIngredientWithDetails extends ValueObject<RecipeIngredientWithDetailsProps> {

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
