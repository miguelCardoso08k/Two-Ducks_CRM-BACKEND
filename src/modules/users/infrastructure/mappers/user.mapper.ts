import { User } from 'src/generated/prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRoleEnum } from '../../domain/enums/user-role.enum';
import { UserStatusEnum } from '../../domain/enums/user-status.enum';
import { UserPlatformStatusEnum } from '../../domain/enums/user-platform-status.enum';
import { UserInboxStatusEnum } from '../../domain/enums/user-inbox-status.enum';
import { UserAvailabilityStatusEnum } from '../../domain/enums/user-availability-status.enum';

export class UserMapper {
  static toEntity(raw: User): UserEntity {
    return new UserEntity({
      id: raw.id,
      companyId: raw.companyId,
      firstName: raw.firstName,
      lastName: raw.lastName,
      firstLogin: raw.firstLogin,
      email: raw.email,
      password: raw.password,
      role: raw.role as UserRoleEnum,
      status: raw.status as UserStatusEnum,
      platformStatus: raw.platformStatus as UserPlatformStatusEnum,
      inboxStatus: raw.inboxStatus as UserInboxStatusEnum,
      availabilityStatus: raw.availabilityStatus as UserAvailabilityStatusEnum,
      maxActiveConversations: raw.maxActiveConversations,
      lastSeenAt: raw.lastSeenAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toHttp(entity: UserEntity) {
    return {
      id: entity.id,
      companyId: entity.companyId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      firstLogin: entity.firstLogin,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      status: entity.status,
      platformStatus: entity.platformStatus,
      inboxStatus: entity.inboxStatus,
      availabilityStatus: entity.availabilityStatus,
      maxActiveConversations: entity.maxActiveConversations,
      lastSeenAt: entity.lastSeenAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPersistence(entity: UserEntity) {
    return {
      companyId: entity.companyId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      firstLogin: entity.firstLogin,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      status: entity.status,
      platformStatus: entity.platformStatus,
      inboxStatus: entity.inboxStatus,
      availabilityStatus: entity.availabilityStatus,
      maxActiveConversations: entity.maxActiveConversations,
    };
  }
}
