import { CompanyEntity } from '../entities/company.entity';
import { CompanyStatusEnum } from '../enums/company-status.enum';

export abstract class CompanyRepository {
  abstract create(company: CompanyEntity): Promise<CompanyEntity>;
  abstract findById(id: string): Promise<CompanyEntity | null>;
  abstract findBySlug(slug: string): Promise<CompanyEntity | null>;
  abstract updateName(id: string, name: string): Promise<CompanyEntity>;
  abstract updateSlug(id: string, slug: string): Promise<CompanyEntity>;
  abstract updateStatus(
    id: string,
    status: CompanyStatusEnum,
  ): Promise<CompanyEntity>;
  abstract delete(id: string): Promise<true>;
}
