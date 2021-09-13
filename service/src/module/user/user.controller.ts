import { UserService } from './user.service';
import { UserGuard } from '@/guard/user.guard';
import { Req, Get, Post, Body, Controller, UseGuards } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';

@Controller('admin/user')
export class UserController {
  public constructor(private readonly UserService: UserService) {}

  @UseGuards(UserGuard)
  @Get('/list')
  async list() {
    return [];
  }

  @Get('/establish')
  async createKey() {
    const { publicKey } = this.UserService.secret;
    return publicKey;
  }

  @Post('/login')
  async login(@Body() account: string) {
    return this.UserService.login(account);
  }

  @Post('/register')
  register(@Body() account: string) {
    return this.UserService.register(account);
  }

  @Get('/logout')
  logout(@Req() req: FastifyRequest) {
    return this.UserService.logout(req.headers.authorization);
  }
}
