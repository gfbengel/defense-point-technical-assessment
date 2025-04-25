import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"



export enum RecipeIngredientUnitEnum {
  MG = 'mg',
  G = 'g',
  KG = 'kg',
  ML = 'ml',
  L = 'l',
  TSP = 'tsp',
  TBSP = 'tbsp',
  CUP = 'cup',
  PINCH = 'pinch',
  DASH = 'dash',
  OZ = 'oz',
  LB = 'lb',
  CLOVE = 'clove',
  PIECE = 'piece',
  SLICE = 'slice',

}

export type RecipeIngredientUnitType = 'mg'
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'pinch'
  | 'dash'
  | 'oz'
  | 'lb'
  | 'clove'
  | 'piece'
  | 'slice'


export interface RecipeIngredientProps {
  recipeId: UniqueEntityId
  ingredientId: UniqueEntityId
  quantity: number
  unit: RecipeIngredientUnitType
}


export class RecipeIngredient extends Entity<RecipeIngredientProps> {

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

  static create(props: RecipeIngredientProps, id?: UniqueEntityId) {
    const recipeIngredient = new RecipeIngredient(props, id)
    return recipeIngredient
  }
}