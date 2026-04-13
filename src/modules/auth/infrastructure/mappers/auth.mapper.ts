import { AuthenticatedUserEntity } from '../../domain/entities/authenticated-user.entity';

export class AuthMapper {
  static toHttp(user: AuthenticatedUserEntity) {
    return {
      id: user.id,
      companyId: user.companyId,
      email: user.email,
      role: user.role,
    };
  }
}
