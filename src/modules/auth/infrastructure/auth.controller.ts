import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../application/dto/login.dto';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { AuthMapper } from './mappers/auth.mapper';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.loginUseCase.execute(dto);

    return {
      message: 'Login completed successfully',
      data: {
        accessToken: result.accessToken,
        user: AuthMapper.toHttp(result.user),
      },
    };
  }
}
