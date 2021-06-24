import { UserService } from './user.service';
import { UserGuard } from '@/guard/user.guard';
import { Get, Post, Body, Controller, UseGuards } from '@nestjs/common';

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
}
