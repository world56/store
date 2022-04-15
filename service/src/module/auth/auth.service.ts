import {
  HttpStatus,
  Injectable,
  HttpException,
  UnauthorizedException,
  PreconditionFailedException,
  ForbiddenException,
} from '@nestjs/common';
import { AdminUserDTO } from '@/dto/admin-user.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AdminUserLoginDTO } from './dto/admin-user-login.dto';
import { JwtAuthService } from '@/common/jwtAuth/jwtAuth.service';
import { EncryptionService } from '@/common/encryption/encryption.service';

import { ENUM_SYSTEM } from '@/enum/system';

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

  decryptAccount(data: AdminUserDTO | AdminUserLoginDTO) {
    const password = this.EncryptionService.decrypt(data.password);
    data.password = this.EncryptionService.md5(password);
    return data;
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

  async register(userInfo: AdminUserDTO) {
    const adminUser = await this.superAdminStatus();
    if (adminUser) {
      throw new HttpException(
        '超级管理员已经存在，请联系系统管理员。',
        HttpStatus.BAD_GATEWAY,
      );
    }
    const data = this.decryptAccount(userInfo) as AdminUserDTO;
    return await this.PrismaService.adminUser.create({ data });
  }

  async login(body: AdminUserLoginDTO) {
    const { account, password } = this.decryptAccount(body);
    const user = await this.PrismaService.adminUser.findFirst({
      where: { account, password },
    });
    if (user) {
      return this.JwtAuthService.create(user);
    }
    throw new PreconditionFailedException('账号或密码错误，请确认后重新输入');
  }
}
