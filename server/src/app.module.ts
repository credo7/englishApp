import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards';

import { WordModule } from './word/word.module';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return configService.database;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    WordModule,
  ],
})
export class AppModule {}
