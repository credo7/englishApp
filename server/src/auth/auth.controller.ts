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
import { Response } from 'express';
import { Tokens } from './types/tokens.type';
import { Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.authService.registerAccount(dto);
  }

  @Public()
  @Get('info')
  async getInfo(){
    return this.authService.getInfo()
  }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async signinLocal(
  //   @Body() dto: AuthDto,
  //   @Res({ passthrough: true }) response: Response,
  // ): Promise<Tokens> {
  //   return this.authService.signinLocal(dto);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // logout(@GetCurrentUserId() userId: number) {
  //   return this.authService.logout(userId);
  // }

  // @Public()
  // @UseGuards(RefreshTokenGuard)
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // async refreshTokens(
  //   @GetCurrentUser('sub') userId: number,
  //   @Body() data,
  // ): Promise<Tokens> {
  //   const tokens = await this.authService.refreshTokens(
  //     userId,
  //     data['refreshToken'],
  //   );
  //   return tokens;
  // }

  // @Public()
  // @Get('user')
  // @HttpCode(HttpStatus.OK)
  // getUserByLogin(@Query() { login }) {
  //   return this.authService.findOneByLogin(login);
  // }
}
