import { ValueObject } from "@/core/entities/value-object";

import { RecipeProps } from "../recipe";
import { RecipeIngredientWithDetails } from "./recipe-ingredient-with-details";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
interface RecipeWithDetailsProps extends RecipeProps {
  id: UniqueEntityId
  ingredients: RecipeIngredientWithDetails[]
}



export class RecipeWithDetails extends ValueObject<RecipeWithDetailsProps> {

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get instructions() {
    return this.props.instructions
  }

  get timeToCookInMinutes() {
    return this.props.timeToCookInMinutes
  }

  get image() {
    return this.props.image
  }

  get isFavorite() {
    return this.props.isFavorite
  }

  get ingredients() {
    return this.props.ingredients
  }

  static create(props: RecipeWithDetailsProps) {
    const recipeWithDetails = new RecipeWithDetails(props)
    return recipeWithDetails
  }
}
