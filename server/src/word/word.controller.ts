import { Controller, Get } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { WordService } from './word.service';

@Controller('words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('get')
  getWords(@GetCurrentUserId() userId: number) {
    return this.wordService.getWordsService(userId);
  }
}
