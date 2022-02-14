import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async getWordsService(userId: number) {
    const words = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        words: true,
      },
    });

    console.log('Here it is' + words);

    return ['hello', 'cat', 'book'];
  }
}
