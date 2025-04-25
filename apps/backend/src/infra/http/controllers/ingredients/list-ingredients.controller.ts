import { ListIngredientsUseCase } from "@/domain/use-cases/ingredients/list-ingredients";
import { Controller, Get } from "@nestjs/common";
import { IngredientWithRecipeCountPresenter } from "../../presenters/ingredient-with-recipe-count.presenter";
@Controller('/list')
export class ListIngredientsController {
  constructor(private readonly listIngredientsUseCase: ListIngredientsUseCase) { }

  @Get()
  async handle() {
    const { ingredients } = await this.listIngredientsUseCase.execute()

    return {
      ingredients: ingredients.map(IngredientWithRecipeCountPresenter.toHTTP)
    }
  }
}

