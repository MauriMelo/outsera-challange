import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoadMoviesService } from './infra/services/load_movies.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(process.env.PORT ?? 3000);

  // const service = app.get(LoadMoviesService)
  // await service.execute()
}

bootstrap();