import type { INestApplication } from '@nestjs/common';
import * as cors from 'cors';

export const middleware = (app: INestApplication) => {
  app.use(
    cors({
      origin: '*',
    }),
  );
};
