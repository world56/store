import { Model } from 'mongoose';
import { AdminUser } from '@/schema/user';
import { InjectModel } from '@nestjs/mongoose';
import { SecretService } from '@/common/service/secret.service';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';

import type * as UserType from '@/interface/user';

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(AdminUser.name)
    private readonly AdminUserSchema: Model<AdminUser>,
    private readonly SecretService: SecretService,
  ) {}

  private async findUser(data: Partial<AdminUser>) {
    return await this.AdminUserSchema.findOne(data);
  }

  async registerUser(data: UserType.AdminUser.LoginAccountSecret) {
    const { account } = data;
    const user = await this.findUser({ account });
    if (user) {
      throw new HttpException(
        '该账号名已经被注册',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      data.password = this.SecretService.aesEncrypt(data.password);
      await this.AdminUserSchema.create(data);
      return;
    }
  }

  async login(data: UserType.AdminUser.LoginAccountSecret) {
    data.password = this.SecretService.aesEncrypt(data.password);
    const user = await this.findUser(data);
    if (user) {
      return user;
    }
    throw new HttpException('请检查账号密码是否正确', HttpStatus.BAD_REQUEST);
  }
}
