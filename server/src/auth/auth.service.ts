import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/auth/types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
// import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  // async signupLocal(dto): Promise<Tokens> {
  //   const hashedPassword = await this.hashData(dto.password);

  //   const newUser = await this.prisma.user.create({
  //     data: {
  //       login: dto.login,
  //       hashedPassword,
  //     },
  //   });

  //   const tokens = await this.getTokens(newUser.id, newUser.login);
  //   await this.updateRefreshToken(newUser.id, tokens.refreshToken);
  //   return tokens;
  // }

  async registerAccount(user) {
    const hashedPassword = await this.hashData(user.password);
    try {
      const newUser = await this.userRepository.save({
        login: user.login,
        password: hashedPassword,
      });

      const tokens = await this.getTokens(newUser.id, newUser.login);

      this.userRepository.update(newUser.id, {
        refreshToken: tokens.refreshToken,
      });

      return tokens;
    } catch {
      throw new HttpException(
        'A user has already been created with this login',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getInfo() {
    return this.userRepository.find({ select: ['login'] });
  }

  // async signinLocal(dto: AuthDto): Promise<Tokens> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       login: dto.login,
  //     },
  //   });

  //   if (!user)
  //     throw new ForbiddenException('User with this login is not found');

  //   const passwordMatches = await bcrypt.compare(
  //     dto.password,
  //     user.hashedPassword,
  //   );

  //   if (!passwordMatches) throw new ForbiddenException('Invalid password');

  //   const tokens = await this.getTokens(user.id, user.login);
  //   await this.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }

  // async logout(userId: number) {
  //   await this.prisma.user.updateMany({
  //     where: {
  //       id: userId,
  //       hashedRefreshToken: {
  //         not: null,
  //       },
  //     },
  //     data: {
  //       hashedRefreshToken: null,
  //     },
  //   });
  // }

  // async refreshTokens(userId: number, refreshToken: string) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   if (!user || !user.hashedRefreshToken) {
  //     throw new ForbiddenException('Access Denied');
  //   }

  //   const refreshTokensMatches = await bcrypt.compare(
  //     refreshToken,
  //     user.hashedRefreshToken,
  //   );

  //   if (!refreshTokensMatches)
  //     throw new ForbiddenException('Invalid refresh token');

  //   const tokens = await this.getTokens(user.id, user.login);
  //   await this.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }

  // async updateRefreshToken(userId: number, refreshToken: string) {
  //   const hash = await this.hashData(refreshToken);
  //   await this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       hashedRefreshToken: hash,
  //     },
  //   });
  // }

  // async findOneByLogin(login: string) {
  //   try {
  //     await this.prisma.user.findUnique({
  //       where: {
  //         login,
  //       },
  //     });
  //     return login;
  //   } catch (_e) {
  //     return false;
  //   }
  // }

  hashData(data: String): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, login: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: 'process.env.ACCESS_SECRET',
          expiresIn: 15 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        { secret: 'process.env.REFRESH_SECRET', expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
