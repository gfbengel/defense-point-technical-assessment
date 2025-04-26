import { Get, Param, Controller } from "@nestjs/common";
import { GetRecipeUseCase } from "@/domain/use-cases/recipes/get-recipe";
import { RecipeWithDetailsPresenter } from "../../presenters/recipe-with-details.presenter";
import { ParseULIDPipe } from "../../pipes/parse-ulid.pipe";

@Controller(':id')
export class GetRecipeController {
  constructor(private readonly getRecipeUseCase: GetRecipeUseCase) { }

  @Get()
  async handle(@Param('id', new ParseULIDPipe()) id: string) {
    const { recipe } = await this.getRecipeUseCase.execute({ id })

    return {
      recipe: RecipeWithDetailsPresenter.toHTTP(recipe)
    }
  }
}
