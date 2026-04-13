import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UpdateMaxActiveConversationsUserUseCase {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async execute(id: string, maxActiveConversations: number) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) throw new NotFoundException('User not found');

    return await this.userRepository.updateMaxActiveConversations(
      id,
      maxActiveConversations,
    );
  }
}
