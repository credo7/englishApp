import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleware } from './app.middleware';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  middleware(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log('Server started on port:' + PORT));
}

bootstrap();
