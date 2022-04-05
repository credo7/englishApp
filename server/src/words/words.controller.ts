import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @UseGuards(AccessTokenGuard)
  @Post('add')
  @HttpCode(HttpStatus.OK)
  addWord(@GetCurrentUser('sub') userId: number, @Body() data) {
    return this.wordsService.addWord(userId, data['word']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get')
  @HttpCode(HttpStatus.OK)
  getWords(@GetCurrentUser('sub') userId: number) {
    return this.wordsService.getWords(userId);
  }
}
