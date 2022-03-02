import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const tokens = await this.authService.signupLocal(dto);
    response.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token };
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const tokens = await this.authService.signinLocal(dto);
    response.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token };
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    response.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token };
  }

  @Public()
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getUserByLogin(@Query() { login }) {
    return this.authService.findOneByLogin(login);
  }
}
