import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordHasherRepository } from 'src/core/security/password-hash/domain/repositories/password-hasher.repository';
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(PasswordHasherRepository)
    private readonly passwordHasherRepository: PasswordHasherRepository,
  ) {}

  async execute(dto: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    if (
      this.normalizeText(user.firstName) !==
        this.normalizeText(dto.firstName) ||
      this.normalizeText(user.lastName) !== this.normalizeText(dto.lastName)
    )
      throw new UnauthorizedException('Invalid credentials');

    const temporaryPassword = '0000';
    const temporaryPasswordHash =
      await this.passwordHasherRepository.hash(temporaryPassword);

    try {
      await this.userRepository.updatePassword(
        user.id!,
        temporaryPasswordHash,
        true,
      );
    } catch {
      throw new InternalServerErrorException('forgot password process failed');
    }
  }

  private normalizeText(value: string) {
    return value.trim().toLowerCase();
  }
}
