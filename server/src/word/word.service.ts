import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Word } from '../entities/word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async getWordsService(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['words'],
    });

    const words = user.words?.map((el) => el.name);

    return words;
  }

  async addWordService(id: string, name: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['words'],
    });

    if (!user.words?.find((el) => el.name === name)) {
      await this.wordRepository.insert({
        name,
        user: {
          id,
        },
      });
    }

    return name;
  }
}
