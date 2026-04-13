import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserStatusEnum } from '../../domain/enums/user-status.enum';

@Injectable()
export class UpdateStatusUserUseCase {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async execute(id: string, status: UserStatusEnum) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) throw new NotFoundException('User not found');

    return await this.userRepository.updateStatus(id, status);
  }
}
