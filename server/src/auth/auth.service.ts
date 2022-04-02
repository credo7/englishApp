import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/auth/types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async registerAccount(user) {
    const hashedPassword = await this.hashData(user.password);
    try {
      const newUser = await this.userRepository.save({
        login: user.login,
        password: hashedPassword,
      });

      const tokens = await this.getTokens(newUser.id, newUser.login);

      this.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch {
      throw new HttpException(
        'A user has already been created with this login',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(data) {
    const user = await this.userRepository.findOne({
      where: { login: data.login },
    });

    if (!user) {
      throw new ForbiddenException('User with this login is not found');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) throw new ForbiddenException('Invalid password');

    const tokens = await this.getTokens(user.id, user.login);
    this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.userRepository.update(userId, {
      refreshToken: null,
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Invalid user id');
    }

    const refreshTokensMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokensMatches) {
      throw new ForbiddenException('Invalid refreshToken');
    }

    const tokens = await this.getTokens(user.id, user.login);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashRefreshToken = await this.hashData(refreshToken);

    await this.userRepository.update(userId, {
      refreshToken: hashRefreshToken,
    });
  }

  async findOneByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: {
        login,
      },
    });
    if (user) return login;
    return false;
  }

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
