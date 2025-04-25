import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infra/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvService } from './infra/env/env.service';
import { UseCaseErrorFilter } from './infra/http/error-filters/use-case-error-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('query parser', 'extended')


  app.useGlobalFilters(new UseCaseErrorFilter())


  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  const envService = app.get(EnvService)
  const port = envService.get('SERVER_PORT')

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });
}
bootstrap();
