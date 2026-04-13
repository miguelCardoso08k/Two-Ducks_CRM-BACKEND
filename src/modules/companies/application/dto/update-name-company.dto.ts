import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNameCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
