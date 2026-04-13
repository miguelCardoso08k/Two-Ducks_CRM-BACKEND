import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UpdateEmailUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, email: string) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) throw new NotFoundException('User not found');

    const existingEmailUser = await this.userRepository.findByEmail(email);

    if (existingEmailUser) throw new NotFoundException('Email already in use');

    return await this.userRepository.updateEmail(id, email);
  }
}
