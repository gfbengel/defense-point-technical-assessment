import { Get, Param, Controller } from "@nestjs/common";
import { GetRecipeUseCase } from "@/domain/use-cases/recipes/get-recipe";
import { RecipeWithIngredientsPresenter } from "../../presenters/recipe-with-ingredients.presenter";
import { ParseULIDPipe } from "../../pipes/parse-ulid.pipe";

@Controller(':id')
export class GetRecipeController {
  constructor(private readonly getRecipeUseCase: GetRecipeUseCase) { }

  @Get()
  async handle(@Param('id', new ParseULIDPipe()) id: string) {
    const { recipe } = await this.getRecipeUseCase.execute({ id })

    return {
      recipe: RecipeWithIngredientsPresenter.toHTTP(recipe)
    }
  }
}
