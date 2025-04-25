import { z } from "zod";
import { createPaginationSchema } from "../../schemas/pagination.schema";
import { Controller, Get, Query } from "@nestjs/common";
import { FetchIngredientsUseCase } from "@/domain/use-cases/ingredients/fetch-ingredients";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { IngredientWithRecipeCountPresenter } from "../../presenters/ingredient-with-recipe-count.presenter";

const ingredientsFilterSchema = z.object({
  name: z.string().optional()
})

const pageQueryParamSchema = createPaginationSchema(ingredientsFilterSchema)


type IngredientsFilters = z.infer<typeof ingredientsFilterSchema>

type PageQueryParamSchema = PaginationParams<IngredientsFilters>

@Controller('/')
export class FetchIngredientsController {
  constructor(private readonly fetchIngredientsUseCase: FetchIngredientsUseCase) { }

  @Get()
  async handle(
    @Query(new ZodValidationPipe(pageQueryParamSchema)) query: PageQueryParamSchema
  ) {
    const { items, totalRowsCount } = await this.fetchIngredientsUseCase.execute({
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      filters: query.filters,
    })

    return {
      items: items.map(IngredientWithRecipeCountPresenter.toHTTP),
      totalRowsCount,
    }
  }
}
