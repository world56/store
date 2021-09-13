import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '@/common/auth/auth.service';
import { SecretService } from '@/common/secret/secret.service';

import { AdminUser } from '@/schema/user';

import type * as UserType from '@/interface/user';
import type { AdminUserSchemaType } from '@/schema/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AdminUser.name)
    private readonly UserModel: AdminUserSchemaType,
    private readonly AuthService: AuthService,
    private readonly SecretService: SecretService,
  ) {}

  get secret() {
    return this.SecretService.secret;
  }

  private decode(user: UserType.AdminUser.LoginAccountSecret | string) {
    const { privateKey } = this.secret;
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

  public async findUser(
    account: UserType.AdminUser.LoginAccountSecret | string,
  ) {
    const param = this.decode(account);
    return this.UserModel.findOne(param);
  }

  async register(account: string) {
    const param = this.decode(account);
    const user = await this.UserModel.findOne({ account: param.account });
    if (user) {
      throw new HttpException(
        '该账号名已经被注册',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      await this.UserModel.create(param);
      return;
    }
  }

  async login(data: string) {
    const param = this.decode(data);
    const user = await this.UserModel.findOne(param);
    if (user) {
      const token = this.AuthService.createJWT(user.toJSON());
      const { name, phone, is_super } = user;
      return { name, phone, is_super, token };
    }
    throw new HttpException('请检查账号密码是否正确', HttpStatus.BAD_REQUEST);
  }

  async logout(authorization: string) {
    throw new HttpException('退出成功', HttpStatus.UNAUTHORIZED);
  }
}
