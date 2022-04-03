import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addWord(userId: number, word: string) {
    const words = await this.userRepository
      .findOne(userId)
      .then((data) => data.words);
    return this.userRepository.update(userId, { words: [...words, word] });
  }

  async getWords(userId) {
    const words = await this.userRepository
      .findOne(userId)
      .then((data) => data.words);
    return words;
  }
}
