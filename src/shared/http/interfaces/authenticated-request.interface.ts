import { FastifyRequest } from 'fastify';
import { AuthenticatedUserEntity } from 'src/modules/auth/domain/entities/authenticated-user.entity';
import { RequestContext } from './request-context.interface';

export interface AuthenticatedRequest extends FastifyRequest {
  user?: AuthenticatedUserEntity;
  context: RequestContext;
}
