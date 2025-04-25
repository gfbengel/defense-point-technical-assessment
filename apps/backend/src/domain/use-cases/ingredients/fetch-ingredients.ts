import { PaginationParams, PaginationResponse } from "@/core/repositories/pagination-params"
import { IngredientWithRecipeCount } from "@/domain/entities/value-objects/ingredient-with-recipe-count"
import { IngredientsRepository } from "@/domain/repositories/ingredients.repository"
import { Injectable } from "@nestjs/common"

type FetchIngredientsFilters = {
  name?: string
}

type FetchIngredientsUseCaseRequest = PaginationParams<FetchIngredientsFilters>

type FetchIngredientsUseCaseResponse = PaginationResponse<IngredientWithRecipeCount>

@Injectable()
export class FetchIngredientsUseCase {
  constructor(private readonly ingredientsRepository: IngredientsRepository) { }

  async execute({
    page,
    pageSize,
    filters,
    sortBy,
  }: FetchIngredientsUseCaseRequest): Promise<FetchIngredientsUseCaseResponse> {

    const { items, totalRowsCount } = await this.ingredientsRepository.findMany({ page, pageSize, sortBy, filters })

    return {
      items,
      totalRowsCount,
    }
  }
}
