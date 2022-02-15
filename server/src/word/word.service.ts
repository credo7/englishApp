import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async getWordsService(userId: number) {
    const userWords = await this.prisma.word.findMany({
      where: {
        userId: userId,
      },
    });

    const words = userWords.map((el) => el.name);

    return words;
  }

  async addWordService(userId: number, name: string) {
    const isRecorded = await this.prisma.word.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (!isRecorded) {
      await this.prisma.word.create({
        data: {
          userId,
          name,
        },
      });
    }

    return name;
  }
}
