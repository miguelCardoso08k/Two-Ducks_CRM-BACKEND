import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSlugCompanyDto {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
