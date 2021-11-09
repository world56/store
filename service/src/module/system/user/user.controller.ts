import { UserService } from './user.service';
import { Req, Get, Post, Body, Controller } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';

@Controller('admin/user')
export class UserController {
  public constructor(private readonly UserService: UserService) {}

  @Get('/list')
  getList() {}

  @Get('/establish')
  createKey() {
    const { publicKey } = this.UserService.secret;
    return publicKey;
  }

  @Post('/login')
  login(@Body() account: string) {
    return this.UserService.login(account);
  }

  @Post('/userInfo')
  getUserInfo(@Req() req: FastifyRequest) {
    const { authorization } = req.headers;
    return this.UserService.getUserInfo(authorization);
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
