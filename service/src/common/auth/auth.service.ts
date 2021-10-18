import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AdminUser } from '@/schema/admin/system/user';

@Injectable()
export class AuthService {
  constructor(private readonly JwtService: JwtService) {}

  createJWT(user: AdminUser) {
    return this.JwtService.sign(user);
  }

  decodeJwt(key: string) {
    try {
      return this.JwtService.verify(key);
    } catch (error) {
      return false;
    }
  }
}
