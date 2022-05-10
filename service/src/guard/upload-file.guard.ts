import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { type FastifyRequest } from 'fastify';

@Injectable()
export class UploadFileGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    if (request.isMultipart()) return true;
    throw new UnsupportedMediaTypeException();
  }
}
