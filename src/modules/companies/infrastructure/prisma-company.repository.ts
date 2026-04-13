import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CompanyEntity } from '../domain/entities/company.entity';
import { CompanyMapper } from './mappers/company.mapper';
import { CompanyStatusEnum } from '../domain/enums/company-status.enum';

@Injectable()
export class PrismaCompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    const created = await this.prisma.company.create({
      data: CompanyMapper.toPersistence(company),
    });
    return CompanyMapper.toEntity(created);
  }

  async findById(id: string): Promise<CompanyEntity | null> {
    const found = await this.prisma.company.findUnique({ where: { id } });
    return found ? CompanyMapper.toEntity(found) : null;
  }

  async findBySlug(slug: string): Promise<CompanyEntity | null> {
    const found = await this.prisma.company.findUnique({ where: { slug } });
    return found ? CompanyMapper.toEntity(found) : null;
  }

  async updateName(id: string, name: string): Promise<CompanyEntity> {
    const updated = await this.prisma.company.update({
      where: { id },
      data: { name },
    });
    return CompanyMapper.toEntity(updated);
  }

  async updateSlug(id: string, slug: string): Promise<CompanyEntity> {
    const updated = await this.prisma.company.update({
      where: { id },
      data: { slug },
    });
    return CompanyMapper.toEntity(updated);
  }

  async updateStatus(
    id: string,
    status: CompanyStatusEnum,
  ): Promise<CompanyEntity> {
    const updated = await this.prisma.company.update({
      where: { id },
      data: { status },
    });
    return CompanyMapper.toEntity(updated);
  }

  async delete(id: string): Promise<true> {
    await this.prisma.company.delete({ where: { id } });
    return true;
  }
}
