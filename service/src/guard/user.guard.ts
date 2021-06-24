import {
  HttpStatus,
  Injectable,
  CanActivate,
  HttpException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthService } from '@/common/auth/auth.service';

import type { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly AuthService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      headers: { authorization },
    } = context.switchToHttp().getRequest();
    if (this.AuthService.decodeJwt(authorization)) {
      return true;
    }
    throw new HttpException('账号过期,请重新登录', HttpStatus.UNAUTHORIZED);
  }
}
