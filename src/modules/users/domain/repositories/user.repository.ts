import { UserEntity } from '../entities/user.entity';
import { UserAvailabilityStatusEnum } from '../enums/user-availability-status.enum';
import { UserInboxStatusEnum } from '../enums/user-inbox-status.enum';
import { UserPlatformStatusEnum } from '../enums/user-platform-status.enum';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserStatusEnum } from '../enums/user-status.enum';

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByCompanyId(companyId: string): Promise<UserEntity[]>;
  abstract findByName(companyId: string, name: string): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract updateName(
    id: string,
    data: { firstName: string; lastName: string },
  ): Promise<UserEntity>;
  abstract updateEmail(id: string, email: string): Promise<UserEntity>;
  abstract updatePassword(id: string, password: string): Promise<UserEntity>;
  abstract updateRole(id: string, role: UserRoleEnum): Promise<UserEntity>;
  abstract updateStatus(
    id: string,
    status: UserStatusEnum,
  ): Promise<UserEntity>;
  abstract updatePlatformStatus(
    id: string,
    platformStatus: UserPlatformStatusEnum,
  ): Promise<UserEntity>;
  abstract updateInboxStatus(
    id: string,
    inboxStatus: UserInboxStatusEnum,
  ): Promise<UserEntity>;
  abstract updateAvailabilityStatus(
    id: string,
    availabilityStatus: UserAvailabilityStatusEnum,
  ): Promise<UserEntity>;
  abstract updateMaxActiveConversations(
    id: string,
    maxActiveConversations: number,
  ): Promise<UserEntity>;
  abstract updateLastSeenAt(id: string, lastSeen: Date): Promise<UserEntity>;
  abstract delete(id: string): Promise<true>;
}
