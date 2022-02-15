import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { WordService } from './word.service';

@Controller('words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('get')
  getWords(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.wordService.getWordsService(userId);
  }

  @Post('add')
  addWord(@Req() req: Request, @Body() data) {
    const userId = req.user['sub'];
    return this.wordService.addWordService(userId, data['word']);
  }
}
