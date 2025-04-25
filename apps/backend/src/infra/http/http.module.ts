import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { IngredientModule } from './modules/ingredient.module'



@Module({
  imports: [
    IngredientModule,
    RouterModule.register([
      { path: 'ingredients', module: IngredientModule },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class HttpModule { }
