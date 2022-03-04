import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
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
import { Response, Request } from 'express';

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
    response.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
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
    response.cookie('refreshToken', tokens.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { access_token: tokens.access_token };
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  // @Public()
  // @UseGuards(RefreshTokenGuard)
  // @Get('refresh')
  // @HttpCode(HttpStatus.OK)
  // async refreshTokens(
  //   @GetCurrentUserId() userId: number,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   const tokens = await this.authService.refreshTokens(userId, refreshToken);
  //   response.cookie('refreshToken', tokens.refresh_token, {
  //     maxAge: 30 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return { access_token: tokens.access_token };
  // }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('sub') userId: number,
    @Req() request: Request,
  ): Promise<any> {
    const refreshToken = request?.cookies['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getUserByLogin(@Query() { login }) {
    return this.authService.findOneByLogin(login);
  }
}
