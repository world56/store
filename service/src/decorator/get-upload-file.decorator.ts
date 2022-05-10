import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { type FastifyRequest } from 'fastify';

export const GetUploadFiles = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<FastifyRequest>().file();
  },
);
