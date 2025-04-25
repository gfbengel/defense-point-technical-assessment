import { IngredientWithRecipeCount } from "@/domain/entities/value-objects/ingredient-with-recipe-count";
import { IngredientsRepository } from "@/domain/repositories/ingredients.repository";
import { Injectable } from "@nestjs/common";


interface ListIngredientsUseCaseResponse {
  ingredients: IngredientWithRecipeCount[]

}

@Injectable()
export class ListIngredientsUseCase {
  constructor(private readonly ingredientsRepository: IngredientsRepository) { }

  async execute(): Promise<ListIngredientsUseCaseResponse> {
    const ingredients = await this.ingredientsRepository.findAll()
    return { ingredients }
  }
}

