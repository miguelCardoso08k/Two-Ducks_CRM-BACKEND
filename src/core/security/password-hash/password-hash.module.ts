import { Module } from '@nestjs/common';
import { PasswordHasherRepository } from './domain/repositories/password-hasher.repository';
import { BcryptPasswordHasherRepository } from './infrastructure/bcrypt-password-hasher.repository';

@Module({
  providers: [
    {
      provide: PasswordHasherRepository,
      useClass: BcryptPasswordHasherRepository,
    },
  ],
  exports: [PasswordHasherRepository],
})
export class PasswordHashModule {}
