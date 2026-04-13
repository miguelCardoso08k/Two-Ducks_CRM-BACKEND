import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyStatusEnum } from '../../domain/enums/company-status.enum';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class UpdateStatusCompanyUseCase {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(id: string, status: CompanyStatusEnum) {
    const extistingCompany = await this.companyRepository.findById(id);

    if (!extistingCompany) throw new NotFoundException('Company not found');

    return this.companyRepository.updateStatus(id, status);
  }
}
