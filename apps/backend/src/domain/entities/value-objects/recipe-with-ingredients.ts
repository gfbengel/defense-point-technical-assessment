import { ValueObject } from "@/core/entities/value-object";

import { RecipeProps } from "../recipe";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
interface RecipeWithIngredientsProps extends Omit<RecipeProps, 'instructions' | 'createdAt' | 'updatedAt'> {
  id: UniqueEntityId
  ingredients: {
    id: UniqueEntityId
    name: string
  }[]
  totalIngredientCount: number
}



export class RecipeWithIngredients extends ValueObject<RecipeWithIngredientsProps> {

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
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

  get totalIngredientCount() {
    return this.props.totalIngredientCount
  }

  static create(props: RecipeWithIngredientsProps) {
    const recipeWithIngredients = new RecipeWithIngredients(props)
    return recipeWithIngredients
  }
}
