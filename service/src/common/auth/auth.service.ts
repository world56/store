import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AdministratorUser } from '@/schema/system/user';

@Injectable()
export class AuthService {
  constructor(private readonly JwtService: JwtService) {}

  createJWT(user: AdministratorUser) {
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
