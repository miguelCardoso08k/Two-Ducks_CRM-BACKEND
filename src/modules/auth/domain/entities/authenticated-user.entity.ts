import { UserRoleEnum } from 'src/modules/users/domain/enums/user-role.enum';

type AuthenticatedUserProps = {
  id: string;
  companyId: string;
  email: string;
  role: UserRoleEnum;
};

export class AuthenticatedUserEntity {
  constructor(private readonly props: AuthenticatedUserProps) {}

  get id() {
    return this.props.id;
  }

  get companyId() {
    return this.props.companyId;
  }

  get email() {
    return this.props.email;
  }

  get role() {
    return this.props.role;
  }
}
