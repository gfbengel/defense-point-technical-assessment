import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { IngredientModule } from './modules/ingredient.module'
import { RecipeModule } from './modules/recipe.module'


@Module({
  imports: [
    IngredientModule,
    RecipeModule,
    RouterModule.register([
      { path: 'ingredients', module: IngredientModule },
      { path: 'recipes', module: RecipeModule },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class HttpModule { }
