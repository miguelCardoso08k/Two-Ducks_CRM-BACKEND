import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { TokenRepository } from '../../domain/repositories/token.repository';
import { UserPlatformStatusEnum } from 'src/modules/users/domain/enums/user-platform-status.enum';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
  ) {}

  async execute(userId: string, token: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.updatePlatformStatus(
      userId,
      UserPlatformStatusEnum.OFFLINE,
    );

    try {
      const isTokenInvalidated =
        await this.tokenRepository.invalidateToken(token);

      if (!isTokenInvalidated) {
        await this.rollbackPlatformStatus(userId);
        throw new InternalServerErrorException('Failed to invalidate token');
      }

      return true;
    } catch {
      await this.rollbackPlatformStatus(userId);
      throw new InternalServerErrorException('Logout failed');
    }
  }

  private async rollbackPlatformStatus(userId: string) {
    try {
      await this.userRepository.updatePlatformStatus(
        userId,
        UserPlatformStatusEnum.ONLINE,
      );
    } catch {
      throw new InternalServerErrorException(
        'Logout failed and platform status rollback failed',
      );
    }
  }
}
