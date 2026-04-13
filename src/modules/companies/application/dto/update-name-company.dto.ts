import { IsNotEmpty, IsString } from 'class-validator';

export class updateNameCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
