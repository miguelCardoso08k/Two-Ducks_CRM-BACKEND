import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyStatusEnum } from '../../domain/enums/company-status.enum';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(dto: CreateCompanyDto) {
    const existingCompany = await this.companyRepository.findBySlug(dto.slug);

    if (existingCompany)
      throw new ConflictException('Company with this slug already exists');

    const company = new CompanyEntity({
      name: dto.name,
      slug: dto.slug,
      status: CompanyStatusEnum.ACTIVE,
    });

    return this.companyRepository.create(company);
  }
}
