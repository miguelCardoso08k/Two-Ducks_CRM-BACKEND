import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class UpddateSlugCompanyUseCase {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(id: string, newSlug: string) {
    const existingCompany = await this.companyRepository.findBySlug(newSlug);

    if (existingCompany)
      throw new ConflictException('Company with this slug already exists');

    return this.companyRepository.updateSlug(id, newSlug);
  }
}
