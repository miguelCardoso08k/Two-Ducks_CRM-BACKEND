import { IsNotEmpty, IsString } from 'class-validator';

export class updateSlugCompanyDto {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
