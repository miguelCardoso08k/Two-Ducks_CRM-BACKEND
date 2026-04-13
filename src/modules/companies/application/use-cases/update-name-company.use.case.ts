import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class UpdateNameCompanyUseCase {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}
  async execute(id: string, name: string) {
    const company = await this.companyRepository.findById(id);

    if (!company) throw new NotFoundException('Company not found');

    return this.companyRepository.updateName(id, name);
  }
}
