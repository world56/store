import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  PreconditionFailedException,
} from '@nestjs/common';
import { AdminUserDTO } from '@/dto/admin-user.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AdminUserLoginDTO } from './dto/admin-user-login.dto';
import { JwtAuthService } from '@/common/jwtAuth/jwtAuth.service';
import { EncryptionService } from '@/common/encryption/encryption.service';

import { ENUM_SYSTEM } from '@/enum/system';
import { AdminUserUpdatePwdDTO } from './dto/admin-user-update-pwd.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly JwtAuthService: JwtAuthService,
    private readonly EncryptionService: EncryptionService,
  ) {}

  createKeys() {
    return this.EncryptionService.createRSA().publicKey;
  }

  private async decryptText(text: string) {
    const ciphertext = this.EncryptionService.decrypt(text);
    return this.EncryptionService.md5(ciphertext);
  }

  async superAdminStatus() {
    const superAdmin = await this.PrismaService.adminUser.findFirst({
      where: { isSuper: ENUM_SYSTEM.SUPER_ADMIN.SUPER },
    });
    return Boolean(superAdmin);
  }

  async getUserInfo(token?: string) {
    if (token) {
      return this.JwtAuthService.decode(token);
    }
    throw new UnauthorizedException('账号未登陆，即将跳转登陆。');
  }

  async register(data: AdminUserDTO) {
    const adminUser = await this.superAdminStatus();
    if (adminUser) {
      throw new PreconditionFailedException(
        '超级管理员已经存在，请联系系统管理员。',
      );
    }
    data.password = await this.decryptText(data.password);
    return await this.PrismaService.adminUser.create({ data });
  }

  async login(body: AdminUserLoginDTO) {
    const { account } = body;
    const password = await this.decryptText(body.password);
    const user = await this.PrismaService.adminUser.findFirst({
      where: { account, password },
    });
    if (user) {
      return this.JwtAuthService.create(user);
    }
    throw new PreconditionFailedException('账号或密码错误，请确认后重新输入');
  }

  async updateUserPwd(body: AdminUserUpdatePwdDTO) {
    const { id, password, newPassword } = body;
    const user = await this.PrismaService.adminUser.findUnique({
      where: { id },
    });
    const [pwd, nPwd] = await Promise.all([
      this.decryptText(password),
      this.decryptText(newPassword),
    ]);
    if (pwd !== user.password) {
      throw new BadRequestException('旧密码错误，请重试重新输入或联系管理员');
    }
    await this.PrismaService.adminUser.update({
      where: { id },
      data: { password: nPwd },
    });
    return true;
  }
}
