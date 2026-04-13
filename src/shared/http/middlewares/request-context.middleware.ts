import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FastifyReply } from 'fastify';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(
    request: AuthenticatedRequest,
    _response: FastifyReply,
    next: () => void,
  ) {
    const requestIdHeader = request.headers['x-request-id'];
    const requestId =
      typeof requestIdHeader === 'string' && requestIdHeader.trim() !== ''
        ? requestIdHeader
        : randomUUID();

    request.context = {
      requestId,
    };

    next();
  }
}
