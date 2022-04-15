import {
  HttpStatus,
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TypeHttpResponseContext<T> {
  content: T;
}

@Injectable()
export class HttpSucessInterceptor<T>
  implements NestInterceptor<T, TypeHttpResponseContext<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<TypeHttpResponseContext<T>> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((content) => {
        response.status(HttpStatus.OK);
        return {
          content,
          message: 'success',
          code: HttpStatus.OK,
        };
      }),
    );
  }
}
