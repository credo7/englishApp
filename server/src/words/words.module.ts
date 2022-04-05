import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { AccessStrategy } from '../auth/strategies/access.strategy';
import { RefreshStrategy } from '../auth/strategies/refresh.strategy';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [WordsController],
  providers: [WordsService, RefreshStrategy, AccessStrategy],
})
export class WordsModule {}
