import { Injectable } from "@nestjs/common";
import { RecipesRepository } from "@/domain/repositories/recipes.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

type ToggleFavoriteStatusUseCaseRequest = {
  id: string
}

@Injectable()
export class ToggleFavoriteStatusUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) { }

  async execute(request: ToggleFavoriteStatusUseCaseRequest): Promise<void> {

    const recipe = await this.recipesRepository.findById(request.id)

    if (!recipe) {
      throw new ResourceNotFoundError()
    }

    recipe.toggleFavoriteStatus()

    await this.recipesRepository.save(recipe)


  }
}