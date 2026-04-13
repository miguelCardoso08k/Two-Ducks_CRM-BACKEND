import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { UserRoleEnum } from '../../domain/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsOptional()
  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxActiveConversations?: number;
}
