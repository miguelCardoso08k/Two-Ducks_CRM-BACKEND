import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { FindByIdUserUseCase } from '../application/use-cases/find-by-id-user.use-case';
import { FindByCompanyUserUseCase } from '../application/use-cases/find-by-company-user.use-case';
import { FindByNameUserUseCase } from '../application/use-cases/find-by-name-user.use-case';
import { UpdateEmailUserUseCase } from '../application/use-cases/update-email-user.use-case';
import { UpdateRoleUserUseCase } from '../application/use-cases/update-role-user.use-case';
import { UpdateStatusUserUseCase } from '../application/use-cases/update-status-user.use-case';
import { UpdateNameUserUseCase } from '../application/use-cases/update-name-user.use-case';
import { UpdateMaxActiveConversationsUserUseCase } from '../application/use-cases/update-max-active-conversations-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UserMapper } from './mappers/user.mapper';
import { UpdateStatusUserDto } from '../application/dto/update-status-user.dto';
import { UpdateEmailUserDto } from '../application/dto/update-email-user.dto';
import { UpdateNameUserDto } from '../application/dto/update-name-user.dto';
import { UpdateRoleUserDto } from '../application/dto/update-role-user.dto';
import { UpdateMaxActiveConversationsUserDto } from '../application/dto/update-max-active-conversations-user.dto';

@Controller('companies/:companyId/users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly findByCompanyUserUseCase: FindByCompanyUserUseCase,
    private readonly findByNameUserUseCase: FindByNameUserUseCase,
    private readonly updateEmailUserUseCase: UpdateEmailUserUseCase,
    private readonly updateRoleUserUseCase: UpdateRoleUserUseCase,
    private readonly updateStatusUserUseCase: UpdateStatusUserUseCase,
    private readonly updateNameUserUseCase: UpdateNameUserUseCase,
    private readonly updateMaxActiveConversationsUserUseCase: UpdateMaxActiveConversationsUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateUserDto,
  ) {
    const user = await this.createUserUseCase.execute(companyId, dto);

    return {
      message: 'User created successfully',
      data: UserMapper.toHttp(user),
    };
  }

  @Get()
  async findAll(@Param('companyId') companyId: string) {
    const users = await this.findByCompanyUserUseCase.execute(companyId);

    return {
      message: 'Users found successfully',
      data: users.map((user) => UserMapper.toHttp(user)),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.findByIdUserUseCase.execute(id);

    return {
      message: 'User found successfully',
      data: UserMapper.toHttp(user),
    };
  }

  @Get('search')
  async search(
    @Param('companyId') companyId: string,
    @Query('name') name: string,
  ) {
    const users = await this.findByNameUserUseCase.execute(companyId, name);

    return {
      message: 'Users found successfully',
      data: users.map((user) => UserMapper.toHttp(user)),
    };
  }

  @Patch(':id/status')
  async updateStatusUser(
    @Param('id') id: string,
    @Body() dto: UpdateStatusUserDto,
  ) {
    const user = await this.updateStatusUserUseCase.execute(id, dto.status);

    return {
      message: 'User status updated successfully',
      data: UserMapper.toHttp(user),
    };
  }

  @Patch(':id/email')
  async updateEmailUser(
    @Param('id') id: string,
    @Body() dto: UpdateEmailUserDto,
  ) {
    const user = await this.updateEmailUserUseCase.execute(id, dto.email);

    return {
      message: 'User email updated successfully',
      data: UserMapper.toHttp(user),
    };
  }

  @Patch(':id/name')
  async updateNameUser(
    @Param('id') id: string,
    @Body() dto: UpdateNameUserDto,
  ) {
    const user = await this.updateNameUserUseCase.execute(id, dto);

    return {
      message: 'User name updated successfully',
      data: UserMapper.toHttp(user),
    };
  }

  @Patch(':id/role')
  async updateRoleUser(
    @Param('id') id: string,
    @Body() dto: UpdateRoleUserDto,
  ) {
    const user = await this.updateRoleUserUseCase.execute(id, dto.role);

    return {
      message: 'User role updated successfully',
      data: UserMapper.toHttp(user),
    };
  }

  @Patch(':id/max-active-conversations')
  async updateMaxActiveConversationsUser(
    @Param('id') id: string,
    @Body() dto: UpdateMaxActiveConversationsUserDto,
  ) {
    const user = await this.updateMaxActiveConversationsUserUseCase.execute(
      id,
      dto.maxActiveConversations,
    );

    return {
      message: 'User max active conversations updated successfully',
      data: UserMapper.toHttp(user),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);

    return {
      message: 'User deleted successfully',
    };
  }
}
