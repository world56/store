import {
  Catch,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';

interface TypeResponseData {
  statusCode: number;
  message: unknown;
  error: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const status = exception.getResponse() as TypeResponseData;
    // const message = `${exception.message} ${
    //   status.message ? String(status.message) : ''
    // }`;
    host
      .switchToHttp()
      .getResponse()
      .status(HttpStatus.OK)
      .send({
        code: exception.getStatus(),
        message: String(status.message),
        timestamp: new Date().valueOf(),
      });
  }
}
