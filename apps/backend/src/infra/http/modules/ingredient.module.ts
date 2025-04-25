import { Module } from "@nestjs/common";
import { ListIngredientsController } from "../controllers/ingredients/list-ingredients.controller";
import { ListIngredientsUseCase } from "@/domain/use-cases/ingredients/list-ingredients";

@Module({
  imports: [],
  controllers: [ListIngredientsController],
  providers: [ListIngredientsUseCase],
  exports: [],
})
export class IngredientModule { }