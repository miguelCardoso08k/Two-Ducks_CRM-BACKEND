import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { AuthenticatedUserEntity } from '../domain/entities/authenticated-user.entity';
import { TokenRepository } from '../domain/repositories/token.repository';
import { UserRoleEnum } from 'src/modules/users/domain/enums/user-role.enum';
import { AuthSessionStatus } from 'src/generated/prisma/enums';

type AccessTokenPayload = {
  sub: string;
  jti: string;
  companyId: string;
  email: string;
  role: UserRoleEnum;
  iat?: number;
  exp?: number;
};

@Injectable()
export class JwtTokenRepository implements TokenRepository {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signAccessToken(user: AuthenticatedUserEntity): Promise<string> {
    const jti = randomUUID();
    const expiresAt = this.createExpirationDate();
    const payload: AccessTokenPayload = {
      sub: user.id,
      jti,
      companyId: user.companyId,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    await this.prisma.authSession.create({
      data: {
        jti,
        userId: user.id,
        companyId: user.companyId,
        status: AuthSessionStatus.ACTIVE,
        expiresAt,
      },
    });

    return accessToken;
  }

  async verifyAccessToken(token: string): Promise<AuthenticatedUserEntity> {
    let payload: AccessTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
        ignoreExpiration: true,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    const authSession = await this.prisma.authSession.findUnique({
      where: { jti: payload.jti },
    });

    if (!authSession || authSession.status !== AuthSessionStatus.ACTIVE) {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    if (authSession.expiresAt.getTime() <= Date.now()) {
      if (authSession.status === AuthSessionStatus.ACTIVE) {
        await this.prisma.authSession.update({
          where: { jti: payload.jti },
          data: { status: AuthSessionStatus.EXPIRED },
        });
      }

      throw new UnauthorizedException('Invalid or expired access token');
    }

    return new AuthenticatedUserEntity({
      id: payload.sub,
      companyId: payload.companyId,
      email: payload.email,
      role: payload.role,
    });
  }

  async invalidateToken(token: string): Promise<boolean> {
    let payload: AccessTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
        ignoreExpiration: true,
      });
    } catch {
      return false;
    }

    const authSession = await this.prisma.authSession.findUnique({
      where: { jti: payload.jti },
    });

    if (!authSession) {
      return false;
    }

    await this.prisma.authSession.update({
      where: { jti: payload.jti },
      data: {
        status: AuthSessionStatus.REVOKED,
        revokedAt: new Date(),
      },
    });

    return true;
  }

  private createExpirationDate() {
    const expiresInSeconds = Number(
      this.configService.get<string>('AUTH_JWT_EXPIRES_IN') ?? 3600,
    );

    const safeExpiresInSeconds = Number.isNaN(expiresInSeconds)
      ? 3600
      : expiresInSeconds;

    return new Date(Date.now() + safeExpiresInSeconds * 1000);
  }
}
