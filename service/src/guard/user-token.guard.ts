import { Reflector } from '@nestjs/core';
import { JwtAuthService } from '@/common/jwtAuth/jwtAuth.service';
import { ReqWhiteList } from '@/decorator/req-white-list.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';

@Injectable()
export class UserTokenGuard implements CanActivate {
  public constructor(
    private readonly Reflector: Reflector,
    private readonly JwtAuthService: JwtAuthService,
  ) {}

  isWhiteList(context: ExecutionContext) {
    return this.Reflector.getAllAndOverride<boolean>(ReqWhiteList.KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicAPI = this.isWhiteList(context);
    if (isPublicAPI) return true;
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user = await this.JwtAuthService.decode(
      request.headers.authorization,
    );
    request.requestContext.set('user', user);
    return Boolean(user);
  }
}
