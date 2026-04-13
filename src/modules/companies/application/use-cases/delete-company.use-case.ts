import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}
  async execute(id: string) {
    const existingCompany = await this.companyRepository.findById(id);

    if (!existingCompany) throw new NotFoundException('Company not found');

    await this.companyRepository.delete(id);

    return true;
  }
}
