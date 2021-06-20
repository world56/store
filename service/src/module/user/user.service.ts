import { AdminUser } from '@/schema/user';
import { InjectModel } from '@nestjs/mongoose';
import { SecretService } from '@/common/secret/secret.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import type { Model, Document } from 'mongoose';
import type * as UserType from '@/interface/user';

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(AdminUser.name)
    private readonly UserModel: Model<AdminUser & Document>,
    private readonly SecretService: SecretService,
  ) {}

  createRSA() {
    return this.SecretService.createRSA();
  }

  private decode(user: UserType.AdminUser.LoginAccountSecret | string) {
    const { privateKey } = this.SecretService.secret;
    if (typeof user === 'object') {
      const pwd = this.SecretService.decrypt(user.password, privateKey);
      user.password = this.SecretService.md5(pwd);
      return user;
    } else {
      const userInfo: UserType.AdminUser.LoginAccountSecret = JSON.parse(
        this.SecretService.decrypt(user, privateKey),
      );
      userInfo.password = this.SecretService.md5(userInfo.password);
      return userInfo;
    }
  }

  async findUser(account: UserType.AdminUser.LoginAccountSecret | string) {
    const param = this.decode(account);
    return this.UserModel.findOne(param);
  }

  async login(data: string) {
    const user = await this.findUser(data);
    if (user) {
      // const token = this.JwtService.sign(user.toJSON());
      const { name, phone, is_super } = user;
      return { name, phone, is_super };
    }
    throw new HttpException('请检查账号密码是否正确', HttpStatus.BAD_REQUEST);
  }
}
