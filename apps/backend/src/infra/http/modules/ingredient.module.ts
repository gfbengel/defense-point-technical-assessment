import { Module } from "@nestjs/common";
import { ListIngredientsController } from "../controllers/ingredients/list-ingredients.controller";
import { ListIngredientsUseCase } from "@/domain/use-cases/ingredients/list-ingredients";
import { FetchIngredientsController } from "../controllers/ingredients/fetch-ingredients.controller";
import { FetchIngredientsUseCase } from "@/domain/use-cases/ingredients/fetch-ingredients";

@Module({
  imports: [],
  controllers: [ListIngredientsController, FetchIngredientsController],
  providers: [ListIngredientsUseCase, FetchIngredientsUseCase],
  exports: [],
})
export class IngredientModule { }