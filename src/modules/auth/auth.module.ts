import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { AuthController } from './infrastructure/auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenRepository } from './domain/repositories/token.repository';
import { JwtTokenRepository } from './infrastructure/jwt-token.repository';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { RolesGuard } from './infrastructure/guards/roles.guard';
import { PasswordHashModule } from 'src/core/security/password-hash/password-hash.module';

@Module({
  imports: [
    ConfigModule,
    PasswordHashModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiresIn = Number(
          configService.get<string>('AUTH_JWT_EXPIRES_IN') ?? 3600,
        );

        return {
          secret: configService.get<string>('AUTH_JWT_SECRET') ?? 'dev-secret',
          signOptions: {
            expiresIn: Number.isNaN(expiresIn) ? 3600 : expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: TokenRepository, useClass: JwtTokenRepository },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    LoginUseCase,
    LogoutUseCase,
  ],
  exports: [TokenRepository, AuthGuard, RolesGuard],
})
export class AuthModule {}
