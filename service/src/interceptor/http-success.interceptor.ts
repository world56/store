import {
  HttpStatus,
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { HttpResponse } from '@/interface/http';

@Injectable()
export class HttpSucessInterceptor<T>
  implements NestInterceptor<T, HttpResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<HttpResponse<T>> {
    const http = context.switchToHttp();
    const response = http.getResponse();
    return next.handle().pipe(
      map((content) => {
        response.status(HttpStatus.OK);
        return {
          content,
          message: 'sucess',
          code: HttpStatus.OK,
        };
      }),
    );
  }
}
