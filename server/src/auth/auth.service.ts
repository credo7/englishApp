import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Tokens } from './types/tokens.type';
import { AuthDto } from './dto';

import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signupLocal(dto): Promise<Tokens> {
    const hashedPassword = await this.hashData(dto.password);

    const user = new User();

    user.login = dto.login;
    user.hashedPassword = hashedPassword;

    await this.userRepository.save(user);

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: {
        login: dto.login,
      },
    });

    if (!user)
      throw new ForbiddenException('User with this login is not found');

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.hashedPassword,
    );

    if (!passwordMatches) throw new ForbiddenException('Invalid password');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(id: string) {
    await this.userRepository.update(
      {
        id,
        hashedRefreshToken: Not(null),
      },
      {
        hashedRefreshToken: null,
      },
    );
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokensMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshTokensMatches)
      throw new ForbiddenException('Invalid refresh token');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userRepository.update(
      {
        id,
      },
      {
        hashedRefreshToken: hash,
      },
    );
  }

  async findOneByLogin(login: string) {
    try {
      await this.userRepository.findOne({
        where: {
          login,
        },
      });

      return login;
    } catch (_e) {
      return false;
    }
  }

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
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
