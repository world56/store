import {
  Body,
  Post,
  Query,
  Session,
  UsePipes,
  Controller,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginPipe } from '@/pipe/user-login.pipe';

import type * as UserType from '@/interface/user';
import type * as FastifySessionType from 'fastify-secure-session';

@Controller('admin/user')
export class UserController {
  public constructor(private readonly UserService: UserService) {}

  @Post('/register')
  async createAdminUser(@Query() params: UserType.AdminUser.LoginAccountSecret) {
    return await this.UserService.registerUser(params);
  }

  @Post('/login')
  @UsePipes(new UserLoginPipe())
  async login(
    @Session() session: FastifySessionType.Session,
    @Body() body: UserType.AdminUser.LoginAccountSecret,
  ) {
    const userInfo = await this.UserService.login(body);
    session.set('user', userInfo);
    return userInfo;
  }
}
