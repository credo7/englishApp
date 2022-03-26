import { DatabaseConfig } from './types/Database';

import Config from './config';

export class ConfigService {
  readonly database: DatabaseConfig;

  readonly port: number;

  constructor() {
    const config = Config();

    this.database = new DatabaseConfig(config.database);

    this.port = config.port;
  }
}
