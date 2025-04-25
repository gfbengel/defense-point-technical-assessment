import { Module } from "@nestjs/common";
import { GetRecipeController } from "../controllers/recipes/get-recipe.controller";
import { GetRecipeUseCase } from "@/domain/use-cases/recipes/get-recipe";
import { FetchRecipesUseCase } from "@/domain/use-cases/recipes/fetch-recipes";
import { FetchRecipesController } from "../controllers/recipes/fetch-recipes.controller";
import { ToggleFavoriteStatusController } from "../controllers/recipes/toggle-favorite-status.controller";
import { ToggleFavoriteStatusUseCase } from "@/domain/use-cases/recipes/toggle-favorite-status";

@Module({
  imports: [],
  controllers: [GetRecipeController, FetchRecipesController, ToggleFavoriteStatusController],
  providers: [GetRecipeUseCase, FetchRecipesUseCase, ToggleFavoriteStatusUseCase],
  exports: [],
})
export class RecipeModule { }