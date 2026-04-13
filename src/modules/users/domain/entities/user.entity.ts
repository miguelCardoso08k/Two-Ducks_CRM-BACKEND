import { UserRoleEnum } from '../enums/user-role.enum';
import { UserStatusEnum } from '../enums/user-status.enum';
import { UserInboxStatusEnum } from '../enums/user-inbox-status.enum';
import { UserAvailabilityStatusEnum } from '../enums/user-availability-status.enum';
import { UserPlatformStatusEnum } from '../enums/user-platform-status.enum';

type UserProps = {
  id?: string;
  companyId: string;
  firstName: string;
  lastName: string;
  firstLogin: boolean;
  email: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  platformStatus: UserPlatformStatusEnum;
  inboxStatus: UserInboxStatusEnum;
  availabilityStatus: UserAvailabilityStatusEnum;
  maxActiveConversations: number;
  lastSeenAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserEntity {
  constructor(private readonly props: UserProps) {}

  get id() {
    return this.props.id;
  }

  get companyId() {
    return this.props.companyId;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get fullName() {
    return `${this.props.firstName} ${this.props.lastName}`;
  }

  get firstLogin() {
    return this.props.firstLogin;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get status() {
    return this.props.status;
  }

  get platformStatus() {
    return this.props.platformStatus;
  }

  get inboxStatus() {
    return this.props.inboxStatus;
  }

  get availabilityStatus() {
    return this.props.availabilityStatus;
  }

  get maxActiveConversations() {
    return this.props.maxActiveConversations;
  }

  get lastSeenAt() {
    return this.props.lastSeenAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
