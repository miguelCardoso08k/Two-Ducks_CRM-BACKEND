import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './infrastructure/users.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindByIdUserUseCase } from './application/use-cases/find-by-id-user.use-case';
import { FindByCompanyUserUseCase } from './application/use-cases/find-by-company-user.use-case';
import { FindByNameUserUseCase } from './application/use-cases/find-by-name-user.use-case';
import { UpdateEmailUserUseCase } from './application/use-cases/update-email-user.use-case';
import { UpdateNameUserUseCase } from './application/use-cases/update-name-user.use-case';
import { UpdateStatusUserUseCase } from './application/use-cases/update-status-user.use-case';
import { UpdateRoleUserUseCase } from './application/use-cases/update-role-user.use-case';
import { UpdateMaxActiveConversationsUserUseCase } from './application/use-cases/update-max-active-conversations-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    { provide: UserRepository, useClass: PrismaUserRepository },
    CreateUserUseCase,
    FindByIdUserUseCase,
    FindByCompanyUserUseCase,
    FindByNameUserUseCase,
    UpdateEmailUserUseCase,
    UpdateNameUserUseCase,
    UpdateStatusUserUseCase,
    UpdateRoleUserUseCase,
    UpdateMaxActiveConversationsUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [{ provide: UserRepository, useClass: PrismaUserRepository }],
})
export class UsersModule {}
