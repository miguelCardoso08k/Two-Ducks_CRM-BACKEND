import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatusEnum } from '../../domain/enums/user-status.enum';

export class UpdateStatusUserDto {
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status!: UserStatusEnum;
}
