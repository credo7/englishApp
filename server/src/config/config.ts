import * as path from 'path';

export default {
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 3306),
    charset: 'utf8mb4',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [path.join(__dirname, '..', 'entity/**/*{.ts,.js')],
    logging: 'all',
    logger: 'simple-console',
    maxQueryExecutionTime: 500,
  },
  port: +process.env.APP_PORT,
};
