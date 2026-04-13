import { Module } from '@nestjs/common';

import { CompaniesController } from './infrastructure/companies.controller';
import { CompanyRepository } from './domain/repositories/company.repository';
import { PrismaCompanyRepository } from './infrastructure/prisma-company.repository';
import { CreateCompanyUseCase } from './application/use-cases/create-company.use-case';
import { DeleteCompanyUseCase } from './application/use-cases/delete-company.use-case';
import { UpdateNameCompanyUseCase } from './application/use-cases/update-name-company.use.case';
import { UpdateStatusCompanyUseCase } from './application/use-cases/update-status-company.use-case';
import { UpddateSlugCompanyUseCase } from './application/use-cases/update-slug-company.use-case';
import { FindByIdCompanyUseCase } from './application/use-cases/find-by-id-company.use-case';

@Module({
  controllers: [CompaniesController],
  providers: [
    { provide: CompanyRepository, useClass: PrismaCompanyRepository },
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
    FindByIdCompanyUseCase,
    UpdateNameCompanyUseCase,
    UpdateStatusCompanyUseCase,
    UpddateSlugCompanyUseCase,
  ],
  exports: [{ provide: CompanyRepository, useClass: PrismaCompanyRepository }],
})
export class CompaniesModule {}
