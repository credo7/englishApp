import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { middleware } from './app.middleware';

import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  middleware(app);

  await app.listen(configService.port);
}

bootstrap();
