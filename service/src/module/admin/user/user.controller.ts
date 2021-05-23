import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

import type * as USER from '@/interface/user';

@Controller('admin/user')
export class UserController {
  public constructor(private readonly UserService: UserService) {}

  @Post('/login')
  async login(@Body() body: USER.AdminUser.LoginAccountSecret) {
    return this.UserService.login();
  }
}
