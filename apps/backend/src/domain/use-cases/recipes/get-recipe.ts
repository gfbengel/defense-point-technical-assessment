import { Injectable } from "@nestjs/common";
import { RecipeWithIngredients } from "@/domain/entities/value-objects/recipe-with-ingredients";
import { RecipesRepository } from "@/domain/repositories/recipes.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

type GetRecipeUseCaseRequest = {
  id: string
}

interface GetRecipeUseCaseResponse {
  recipe: RecipeWithIngredients
}

@Injectable()
export class GetRecipeUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) { }

  async execute(request: GetRecipeUseCaseRequest): Promise<GetRecipeUseCaseResponse> {
    const recipe = await this.recipesRepository.findDetailedById(request.id)

    if (!recipe) {
      throw new ResourceNotFoundError()
    }

    return {
      recipe
    }
  }
}