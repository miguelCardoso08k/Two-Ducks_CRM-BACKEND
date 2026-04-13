import { Company } from 'src/generated/prisma/client';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyStatusEnum } from '../../domain/enums/company-status.enum';

export class CompanyMapper {
  static toEntity(raw: Company): CompanyEntity {
    return new CompanyEntity({
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      status: raw.status as CompanyStatusEnum,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toHttp(entity: CompanyEntity) {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPersistence(entity: CompanyEntity) {
    return {
      name: entity.name,
      slug: entity.slug,
      status: entity.status,
    };
  }
}
