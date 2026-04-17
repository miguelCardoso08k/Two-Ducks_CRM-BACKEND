import { AuthenticatedUserEntity } from '../entities/authenticated-user.entity';

export abstract class TokenRepository {
  abstract signAccessToken(user: AuthenticatedUserEntity): Promise<string>;
  abstract verifyAccessToken(token: string): Promise<AuthenticatedUserEntity>;
  abstract invalidateToken(token: string): Promise<boolean>;
}
