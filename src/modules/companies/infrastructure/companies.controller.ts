import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindByIdCompanyUseCase } from '../application/use-cases/find-by-id-company.use-case';
import { CreateCompanyUseCase } from '../application/use-cases/create-company.use-case';
import { UpddateSlugCompanyUseCase } from '../application/use-cases/update-slug-company.use-case';
import { DeleteCompanyUseCase } from '../application/use-cases/delete-company.use-case';
import { CreateCompanyDto } from '../application/dto/create-company.dto';
import { updateSlugCompanyDto } from '../application/dto/update-slug.company.dto';
import { updateStatusCompanyDto } from '../application/dto/update-status.company.dto';
import { updateNameCompanyDto } from '../application/dto/update-name-company.dto';
import { CompanyMapper } from './mappers/company.mapper';
import { UpdateNameCompanyUseCase } from '../application/use-cases/update-name-company.use.case';
import { UpdateStatusCompanyUseCase } from '../application/use-cases/update-status-company.use-case';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly findCompanyIdUseCase: FindByIdCompanyUseCase,
    private readonly updateSlugCompanyUseCase: UpddateSlugCompanyUseCase,
    private readonly updateStatusCompanyUseCase: UpdateStatusCompanyUseCase,
    private readonly updateNameCompanyUseCase: UpdateNameCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateCompanyDto) {
    const company = await this.createCompanyUseCase.execute(dto);

    return {
      message: 'Company created successfully',
      data: CompanyMapper.toHttp(company),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const company = await this.findCompanyIdUseCase.execute(id);

    return {
      message: 'Company found successfully',
      data: CompanyMapper.toHttp(company),
    };
  }

  @Patch(':id/name')
  async updateName(@Param('id') id: string, @Body() dto: updateNameCompanyDto) {
    const company = await this.updateNameCompanyUseCase.execute(id, dto.name);

    return {
      message: 'Company name updated successfully',
      data: CompanyMapper.toHttp(company),
    };
  }

  @Patch(':id/slug')
  async updateSlug(@Param('id') id: string, @Body() dto: updateSlugCompanyDto) {
    const company = await this.updateSlugCompanyUseCase.execute(id, dto.slug);

    return {
      message: 'Company slug updated successfully',
      data: CompanyMapper.toHttp(company),
    };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: updateStatusCompanyDto,
  ) {
    const company = await this.updateStatusCompanyUseCase.execute(
      id,
      dto.status,
    );

    return {
      message: 'Company status updated successfully',
      data: CompanyMapper.toHttp(company),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteCompanyUseCase.execute(id);

    return {
      message: 'Company deleted successfully',
    };
  }
}
