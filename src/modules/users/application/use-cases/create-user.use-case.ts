import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRoleEnum } from '../../domain/enums/user-role.enum';
import { UserStatusEnum } from '../../domain/enums/user-status.enum';
import { UserPlatformStatusEnum } from '../../domain/enums/user-platform-status.enum';
import { UserInboxStatusEnum } from '../../domain/enums/user-inbox-status.enum';
import { UserAvailabilityStatusEnum } from '../../domain/enums/user-availability-status.enum';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(companyId: string, dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new UserEntity({
      companyId: companyId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      firstLogin: true,
      email: dto.email,
      password: '000000', // TODO: Generate a random password and send it to the user via email
      role: dto.role || UserRoleEnum.AGENT,
      status: UserStatusEnum.ACTIVE,
      platformStatus: UserPlatformStatusEnum.OFFLINE,
      inboxStatus: UserInboxStatusEnum.OFFLINE,
      availabilityStatus: UserAvailabilityStatusEnum.OFF_SHIFT,
      maxActiveConversations: dto.maxActiveConversations || 5,
    });

    return this.userRepository.create(user);
  }
}
