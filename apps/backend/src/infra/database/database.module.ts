import { Global, Module } from '@nestjs/common'
import { Pool } from 'pg'


import { ConfigurableDatabaseModule, CONNECTION_POOL } from './database.module-definition'
import { DATABASE_OPTIONS } from './database.module-definition'
import { DatabaseOptions } from './database-options'
import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleIngredientsRepository } from './drizzle/repositories/drizzle-ingredients.repository'
import { IngredientsRepository } from '@/domain/repositories/ingredients.repository'

@Global()
@Module({
  exports: [
    DrizzleService,

    IngredientsRepository,
  ],
  providers: [
    DrizzleService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,

        })
      },
    },
    {
      provide: IngredientsRepository,
      useClass: DrizzleIngredientsRepository,
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule { }
