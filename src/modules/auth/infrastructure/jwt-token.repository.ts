import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserEntity } from '../domain/entities/authenticated-user.entity';
import { TokenRepository } from '../domain/repositories/token.repository';
import { UserRoleEnum } from 'src/modules/users/domain/enums/user-role.enum';

type AccessTokenPayload = {
  sub: string;
  companyId: string;
  email: string;
  role: UserRoleEnum;
  iat?: number;
  exp?: number;
};

@Injectable()
export class JwtTokenRepository implements TokenRepository {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(user: AuthenticatedUserEntity): Promise<string> {
    const payload: AccessTokenPayload = {
      sub: user.id,
      companyId: user.companyId,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.signAsync(payload);
  }

  async verifyAccessToken(token: string): Promise<AuthenticatedUserEntity> {
    let payload: AccessTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    return new AuthenticatedUserEntity({
      id: payload.sub,
      companyId: payload.companyId,
      email: payload.email,
      role: payload.role,
    });
  }
}
