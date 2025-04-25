import { RecipeWithIngredients } from "@/domain/entities/value-objects/recipe-with-ingredients";
import { PaginationResponse } from "@/core/repositories/pagination-params";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { RecipesRepository } from "@/domain/repositories/recipes.repository";
import { Injectable } from "@nestjs/common";

type FetchRecipesFilters = {
  title?: string
  ingredientIds?: string[]
}

type FetchRecipesUseCaseRequest = PaginationParams<FetchRecipesFilters>

type FetchRecipesUseCaseResponse = PaginationResponse<RecipeWithIngredients>


@Injectable()
export class FetchRecipesUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) { }

  async execute({
    page,
    pageSize,
    filters,
    sortBy,
  }: FetchRecipesUseCaseRequest): Promise<FetchRecipesUseCaseResponse> {



    const {
      items,
      totalRowsCount,
    } = await this.recipesRepository.findMany({
      page,
      pageSize,
      filters,
      sortBy,
    })

    return {
      items,
      totalRowsCount,
    }
  }

}

