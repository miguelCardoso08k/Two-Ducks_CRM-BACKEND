import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateMaxActiveConversationsUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxActiveConversations!: number;
}
