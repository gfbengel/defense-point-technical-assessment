import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import { generateEntityTimestamps } from "@/core/utils/generate-entity-timestamps"

export interface RecipeProps {
  title: string
  description: string
  instructions: string
  timeToCookInMinutes: number
  image?: string | null
  isFavorite: boolean

  createdAt: Date
  updatedAt: Date

}


export class Recipe extends Entity<RecipeProps> {

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


  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<RecipeProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityId) {
    const recipe = new Recipe(generateEntityTimestamps(props), id)

    return recipe
  }
}