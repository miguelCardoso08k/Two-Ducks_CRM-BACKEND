import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmailUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
