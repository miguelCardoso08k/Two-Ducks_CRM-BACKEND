import {
  Inject,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { UserStatusEnum } from 'src/modules/users/domain/enums/user-status.enum';
import { PasswordHasherRepository } from 'src/core/security/password-hash/domain/repositories/password-hasher.repository';
import { TokenRepository } from '../../domain/repositories/token.repository';
import { AuthenticatedUserEntity } from '../../domain/entities/authenticated-user.entity';
import { UserPlatformStatusEnum } from 'src/modules/users/domain/enums/user-platform-status.enum';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(PasswordHasherRepository)
    private readonly passwordHasherRepository: PasswordHasherRepository,
    @Inject(TokenRepository)
    private readonly tokenRepository: TokenRepository,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.passwordHasherRepository.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status !== UserStatusEnum.ACTIVE) {
      throw new ForbiddenException('User is inactive');
    }

    await this.userRepository.updatePlatformStatus(
      user.id!,
      UserPlatformStatusEnum.ONLINE,
    );

    try {
      const authenticatedUser = new AuthenticatedUserEntity({
        id: user.id!,
        companyId: user.companyId,
        email: user.email,
        role: user.role,
      });

      const accessToken =
        await this.tokenRepository.signAccessToken(authenticatedUser);

      return {
        accessToken,
        user: authenticatedUser,
      };
    } catch {
      await this.userRepository.updatePlatformStatus(
        user.id!,
        UserPlatformStatusEnum.OFFLINE,
      );

      throw new InternalServerErrorException('Login failed');
    }
  }
}
