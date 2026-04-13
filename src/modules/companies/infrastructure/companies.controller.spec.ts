import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompanyUseCase } from '../application/use-cases/create-company.use-case';
import { DeleteCompanyUseCase } from '../application/use-cases/delete-company.use-case';
import { FindByIdCompanyUseCase } from '../application/use-cases/find-by-id-company.use-case';
import { UpdateNameCompanyUseCase } from '../application/use-cases/update-name-company.use.case';
import { UpdateStatusCompanyUseCase } from '../application/use-cases/update-status-company.use-case';
import { UpddateSlugCompanyUseCase } from '../application/use-cases/update-slug-company.use-case';
import { CompaniesController } from './companies.controller';

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        CreateCompanyUseCase,
        DeleteCompanyUseCase,
        FindByIdCompanyUseCase,
        UpdateNameCompanyUseCase,
        UpdateStatusCompanyUseCase,
        UpddateSlugCompanyUseCase,
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
