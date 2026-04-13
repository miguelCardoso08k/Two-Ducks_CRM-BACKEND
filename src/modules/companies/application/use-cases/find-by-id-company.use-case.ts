import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class FindByIdCompanyUseCase {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(id: string) {
    const company = await this.companyRepository.findById(id);

    if (!company) throw new NotFoundException('Company not found');

    return company;
  }
}
