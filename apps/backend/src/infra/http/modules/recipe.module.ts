import { Module } from "@nestjs/common";
import { GetRecipeController } from "../controllers/recipes/get-recipe.controller";
import { GetRecipeUseCase } from "@/domain/use-cases/recipes/get-recipe";
import { FetchRecipesUseCase } from "@/domain/use-cases/recipes/fetch-recipes";
import { FetchRecipesController } from "../controllers/recipes/fetch-recipes.controller";

@Module({
  imports: [],
  controllers: [GetRecipeController, FetchRecipesController],
  providers: [GetRecipeUseCase, FetchRecipesUseCase],
  exports: [],
})
export class RecipeModule { }