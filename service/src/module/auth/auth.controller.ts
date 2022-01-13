import { AuthService } from './auth.service';
import { Req, Get, Post, Body, Controller } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';

@Controller('admin/auth')
export class AuthController {
  public constructor(private readonly AuthService: AuthService) {}

  @Get('/establish')
  createKey() {
    const { publicKey } = this.AuthService.createKeys();
    return publicKey;
  }

  @Post('/login')
  login(@Body() account: string) {
    return this.AuthService.login(account);
  }

  @Post('/userInfo')
  getUserInfo(@Req() req: FastifyRequest) {
    const { authorization } = req.headers;
    return this.AuthService.getUserInfo(authorization);
  }

  @Post('/register')
  register(@Body() account: string) {
    return this.AuthService.register(account);
  }

  @Get('/logout')
  logout() {
    return this.AuthService.logout();
  }

  @Get('/superAdminStatus')
  superAdminStatus() {
    return this.AuthService.getSuperAdminStatus();
  }
}
