import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoleEnum } from '../../domain/enums/user-role.enum';

export class UpdateRoleUserDto {
  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role!: UserRoleEnum;
}
