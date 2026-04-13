import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserRoleEnum } from '../../domain/enums/user-role.enum';

@Injectable()
export class UpdateRoleUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, role: UserRoleEnum) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) throw new NotFoundException('User not found');

    return await this.userRepository.updateRole(id, role);
  }
}
