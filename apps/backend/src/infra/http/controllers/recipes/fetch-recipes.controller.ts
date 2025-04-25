import { z } from "zod";
import { createPaginationSchema } from "../../schemas/pagination.schema";
import { Controller, Get, Query } from "@nestjs/common";
import { FetchRecipesUseCase } from "@/domain/use-cases/recipes/fetch-recipes";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";
import { PaginationParams } from "@/core/repositories/pagination-params";

import { RecipeWithIngredientsPresenter } from "../../presenters/recipe-with-ingredients.presenter";

const recipesFilterSchema = z.object({
  title: z.string().optional(),
  ingredientIds: z.array(z.string().ulid()).optional().default([]),

})

const pageQueryParamSchema = createPaginationSchema(recipesFilterSchema)


type RecipesFilters = z.infer<typeof recipesFilterSchema>

type PageQueryParamSchema = PaginationParams<RecipesFilters>

@Controller('/')
export class FetchRecipesController {
  constructor(private readonly fetchRecipesUseCase: FetchRecipesUseCase) { }

  @Get()
  async handle(
    @Query(new ZodValidationPipe(pageQueryParamSchema)) query: PageQueryParamSchema
  ) {
    const { items, totalRowsCount } = await this.fetchRecipesUseCase.execute({
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      filters: query.filters,
    })

    return {
      recipes: items.map(RecipeWithIngredientsPresenter.toHTTP),
      totalRowsCount,
    }
  }
}
