import { Module } from "@nestjs/common";
import { GetRecipeController } from "../controllers/recipes/get-recipe.controller";
import { GetRecipeUseCase } from "@/domain/use-cases/recipes/get-recipe";

@Module({
  imports: [],
  controllers: [GetRecipeController],
  providers: [GetRecipeUseCase],
  exports: [],
})
export class RecipeModule { }