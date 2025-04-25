
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from 'src/infra/env/env'
import { EnvModule } from 'src/infra/env/env.module'

import { DatabaseModule } from '@infra/database/database.module'
import { EnvService } from '@infra/env/env.service'
import { HttpModule } from '@infra/http/http.module'



@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
      envFilePath: ['.env', '../.env', '../../.env'],
    }),

    DatabaseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        host: env.get('POSTGRES_HOST'),
        port: env.get('POSTGRES_PORT'),
        user: env.get('POSTGRES_USER'),
        password: env.get('POSTGRES_PASSWORD'),
        database: env.get('POSTGRES_DB'),
      }),
    }),


    HttpModule,
    EnvModule,
  ],
  providers: [],
})
export class AppModule { }
