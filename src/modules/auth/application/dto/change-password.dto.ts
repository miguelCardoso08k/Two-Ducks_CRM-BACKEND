import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/shared/validation/decorators/match.decorator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword!: string;

  @IsString()
  @IsNotEmpty()
  @Match<ChangePasswordDto>('newPassword', {
    message: 'confirmNewPassword must match newPassword',
  })
  confirmNewPassword!: string;
}
