import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordService } from './word.service';
import { WordController } from './word.controller';

import { User } from '../entities/user.entity';
import { Word } from '../entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Word])],
  providers: [WordService],
  controllers: [WordController],
})
export class WordModule {}
