import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UpdateNameUserUseCase {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async execute(id: string, data: { firstName: string; lastName: string }) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) throw new NotFoundException('User not found');

    return await this.userRepository.updateName(id, data);
  }
}
