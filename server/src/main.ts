import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: '*',
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log('Server started on port:' + PORT));
}

bootstrap();
