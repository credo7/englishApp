import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [],
  providers: [],
  imports: [AuthModule, PrismaModule],
})
export class AppModule {}
