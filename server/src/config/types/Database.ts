import { Logger } from 'typeorm/logger/Logger';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

import BaseConfig from './BaseConfig';

export class DatabaseConfig extends BaseConfig {
  readonly type: 'mysql' | 'mariadb';

  readonly host: string;
  readonly port: number;

  readonly username: string;
  readonly password: string;

  readonly database: string;

  readonly entities: string[];
  readonly synchronize: boolean;

  readonly logging: LoggerOptions;
  readonly logger:
    | 'advanced-console'
    | 'simple-console'
    | 'file'
    | 'debug'
    | Logger;

  readonly maxQueryExecutionTime: number;

  constructor(config) {
    super(config);
  }
}
