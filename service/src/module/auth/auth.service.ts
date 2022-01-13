import { InjectModel } from '@nestjs/mongoose';
import { JwtAuthService } from '@/common/jwtAuth/auth.service';
import { SecretService } from '@/common/secret/secret.service';
import { AdminUser as AdminUserModel } from '@/schema/system/user';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { ENUM_ADMIN } from '@/enum/admin';

import type { TypeSecret } from '@/interface/secret';
import type { TypeSystemUser } from '@/interface/system/user';
import type { TypeSchemaAadminUser } from '@/schema/system/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminUserModel.name)
    private readonly UserModel: TypeSchemaAadminUser,
    private readonly SecretService: SecretService,
    public readonly JwtAuthService: JwtAuthService,
  ) {}

  private UserKeys: TypeSecret.KeyToRSA;

  createKeys() {
    this.UserKeys = this.SecretService.createRSA();
    return this.UserKeys;
  };

  private decode(user: TypeSystemUser.LoginAccountSecret | string) {
    const { privateKey } = this.UserKeys;
    if (typeof user === 'object') {
      const pwd = this.SecretService.decrypt(user.password, privateKey);
      user.password = this.SecretService.md5(pwd);
      return user;
    } else {
      const userInfo: TypeSystemUser.Info = JSON.parse(
        this.SecretService.decrypt(user, privateKey),
      );
      userInfo.password = this.SecretService.md5(userInfo.password);
      return userInfo;
    }
  }

  async register(account: string) {
    const param = this.decode(account) as TypeSystemUser.Info;
    param.isSuper = ENUM_ADMIN.ADMINISTRATOR.SUPER;
    const user = await this.UserModel.findOne({
      $or: [
        { account: param.account },
        { isSuper: ENUM_ADMIN.ADMINISTRATOR.SUPER },
      ],
    });
    if (user) {
      throw new HttpException(
        '系统只能注册一个超级管理员',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      await this.UserModel.create(param);
      return;
    }
  }

  async login(data: string) {
    const param = this.decode(data);
    const user = await this.UserModel.findOne(param, {
      password: 0,
      status: 0,
    });
    if (user) {
      return this.JwtAuthService.createJWT(user.toJSON());
    }
    throw new HttpException('请检查账号密码是否正确', HttpStatus.BAD_REQUEST);
  }

  async getUserInfo(authorization: string) {
    const params = this.JwtAuthService.decodeJwt(authorization);
    if (params._id) {
      const { iat, exp, ...param } = params;
      return param;
    }
    throw new HttpException('账号过期,请重新登录', HttpStatus.UNAUTHORIZED);
  }

  async logout() {
    throw new HttpException('退出成功', HttpStatus.UNAUTHORIZED);
  }

  async getSuperAdminStatus() {
    const status = await this.UserModel.findOne({
      isSuper: ENUM_ADMIN.ADMINISTRATOR.SUPER,
    });
    return Boolean(status);
  }
}
