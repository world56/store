import { JwtService } from '@nestjs/jwt';
import { AdminUserDTO } from '@/dto/admin-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

type TypeTokenParam = Omit<AdminUserDTO, 'roles' | 'deps'>;

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly PrismaService: PrismaService,
  ) {}

  async findUser(dto: TypeTokenParam) {
    const { account, password, status } = dto;
    const user = await this.PrismaService.adminUser.findFirst({
      where: { account, password, status },
    });
    if (user) return user;
    throw new UnauthorizedException('不是有效的用户');
  }

  create(data: TypeTokenParam) {
    return this.JwtService.sign(data);
  }

  async decode(token: string) {
    try {
      const { iat, exp, ...user } = this.JwtService.verify(token);
      const data = await this.findUser(user);
      const { status, password, remark, ...protectedData } = data;
      return protectedData;
    } catch (error) {
      console.log('JWT-error', error);
      throw new UnauthorizedException('账号过期,请重新登录');
    }
  }
}
