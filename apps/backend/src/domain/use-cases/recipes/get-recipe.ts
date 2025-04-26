import { Injectable } from "@nestjs/common";
import { RecipeWithDetails } from "@/domain/entities/value-objects/recipe-with-details";
import { RecipesRepository } from "@/domain/repositories/recipes.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

type GetRecipeUseCaseRequest = {
  id: string
}

interface GetRecipeUseCaseResponse {
  recipe: RecipeWithDetails
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