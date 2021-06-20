import {
  Get,
  Post,
  Body,
  Controller,
  UseGuards,
  Request,
  Injectable,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('admin/user')
export class UserController {
  public constructor(private readonly UserService: UserService) {}

  @Get('/establish')
  async createKey() {
    const { publicKey } = await this.UserService.createRSA();
    return publicKey;
  }

  @Post('/login')
  async login(@Body() account: string) {
    return this.UserService.login(account);
  }

  @Post('/register')
  register() {}
}
