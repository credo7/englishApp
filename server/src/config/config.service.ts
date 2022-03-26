import { Injectable } from '@nestjs/common';
import { Global } from '@nestjs/common';

import { DatabaseConfig } from './types/Database';

import config from './config';

@Injectable()
@Global()
export class ConfigService {
  readonly database: DatabaseConfig;

  readonly port: number;

  constructor() {
    this.database = new DatabaseConfig(config.database);

    this.port = config.port;
  }
}
