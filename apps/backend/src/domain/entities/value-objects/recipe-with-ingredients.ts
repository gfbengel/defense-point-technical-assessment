import { ValueObject } from "@/core/entities/value-object";

import { RecipeProps } from "../recipe";
import { RecipeIngredientWithDetails } from "./recipe-ingredient-with-details";

interface RecipeWithIngredientsProps extends RecipeProps {
  ingredients: RecipeIngredientWithDetails[]
}



export class RecipeWithIngredients extends ValueObject<RecipeWithIngredientsProps> {

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

  static create(props: RecipeWithIngredientsProps) {
    const recipeWithIngredients = new RecipeWithIngredients(props)
    return recipeWithIngredients
  }
}
