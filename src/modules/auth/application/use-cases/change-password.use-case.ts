import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PasswordHasherRepository } from 'src/core/security/password-hash/domain/repositories/password-hasher.repository';
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(PasswordHasherRepository)
    private readonly passwordHasherRepository: PasswordHasherRepository,
  ) {}

  async execute(userId: string, dto: ChangePasswordDto) {
    if (dto.currentPassword === dto.newPassword)
      throw new UnprocessableEntityException(
        'The new password must be different from the current password.',
      );

    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const isMatch = await this.passwordHasherRepository.compare(
      dto.currentPassword,
      user.password,
    );

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const newPasswordHash = await this.passwordHasherRepository.hash(
      dto.newPassword,
    );

    try {
      await this.userRepository.updatePassword(userId, newPasswordHash, false);
    } catch {
      throw new InternalServerErrorException('Change password failed');
    }
  }
}
