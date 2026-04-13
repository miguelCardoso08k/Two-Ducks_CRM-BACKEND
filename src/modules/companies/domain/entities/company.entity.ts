import { CompanyStatusEnum } from '../enums/company-status.enum';

type CompanyProps = {
  id?: string;
  name: string;
  slug: string;
  status: CompanyStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
};

export class CompanyEntity {
  constructor(private readonly props: CompanyProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
