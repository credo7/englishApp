import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { WordService } from './word.service';

@Controller('words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('get')
  getWords(@Req() req: Request) {
    const userId = req.user['sub'];
    this.wordService.getWordsService(userId);
  }
}
