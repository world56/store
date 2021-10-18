import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '@/common/auth/auth.service';
import { SecretService } from '@/common/secret/secret.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { AdminUser } from '@/schema/admin/system/user';

import type * as TypeUser from '@/interface/user';
import type { TypeAdminUserSchema } from '@/schema/admin/system/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AdminUser.name)
    private readonly UserModel: TypeAdminUserSchema,
    private readonly SecretService: SecretService,
    public readonly AuthService: AuthService,
  ) {}

  get secret() {
    return this.SecretService.secret;
  }

  private decode(user: TypeUser.AdminUser.LoginAccountSecret | string) {
    const { privateKey } = this.secret;
    if (typeof user === 'object') {
      const pwd = this.SecretService.decrypt(user.password, privateKey);
      user.password = this.SecretService.md5(pwd);
      return user;
    } else {
      const userInfo: TypeUser.AdminUser.LoginAccountSecret = JSON.parse(
        this.SecretService.decrypt(user, privateKey),
      );
      userInfo.password = this.SecretService.md5(userInfo.password);
      return userInfo;
    }
  }

  public async findUser(
    account: TypeUser.AdminUser.LoginAccountSecret | string,
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
      return this.AuthService.createJWT(user.toJSON());
    }
    throw new HttpException('请检查账号密码是否正确', HttpStatus.BAD_REQUEST);
  }

  async logout() {
    throw new HttpException('退出成功', HttpStatus.UNAUTHORIZED);
  }
}
