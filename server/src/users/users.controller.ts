import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async createUser(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.usersService.create({
      login,
      password: hashedPassword,
    });

    delete (await user).password;
    return user;
  }

  @Post('login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.usersService.findOne({ login });

    if (!user) {
      throw new BadRequestException('invalid credetantials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }

  @Get('user')
  async logWithCoockie(@Req() request: Request) {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne({ id: data['id'] });

    const { password, ...result } = user;

    return result;
  }
  catch(e) {
    throw new UnauthorizedException();
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
