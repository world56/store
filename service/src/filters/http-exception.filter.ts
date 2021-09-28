import {
  Catch,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    host.switchToHttp().getResponse().status(HttpStatus.OK).send({
      message: exception.message,
      code: exception.getStatus(),
    });
  }
}
