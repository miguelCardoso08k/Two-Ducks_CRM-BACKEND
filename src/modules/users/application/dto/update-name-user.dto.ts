import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNameUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
