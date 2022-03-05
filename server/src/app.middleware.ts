import type { INestApplication } from '@nestjs/common';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

export const middleware = (app: INestApplication) => {
  app.use(cookieParser());
  app.use(
    cors({
      origin: '*',
    }),
  );
};
