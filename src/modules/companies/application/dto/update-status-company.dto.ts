import { IsEnum, IsNotEmpty } from 'class-validator';
import { CompanyStatusEnum } from '../../domain/enums/company-status.enum';

export class UpdateStatusCompanyDto {
  @IsEnum(CompanyStatusEnum)
  @IsNotEmpty()
  status: CompanyStatusEnum;
}
