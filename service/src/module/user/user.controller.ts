import { UserService } from './user.service';
import { Req, Get, Post, Body, Controller } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';

@Controller('admin/user')
export class UserController {
  public constructor(private readonly UserService: UserService) {}

  @Get('/establish')
  async createKey() {
    const { publicKey } = this.UserService.secret;
    return publicKey;
  }

  @Post('/login')
  async login(@Body() account: string) {
    return this.UserService.login(account);
  }

  @Post('/userInfo')
  async getUserInfo(@Req() req: FastifyRequest) {
    const { authorization } = req.headers;
    const { password, iat, exp, __v, ...param } =
      this.UserService.AuthService.decodeJwt(authorization);
    return param;
  }

  @Post('/register')
  register(@Body() account: string) {
    return this.UserService.register(account);
  }

  @Get('/logout')
  logout() {
    return this.UserService.logout();
  }
}
