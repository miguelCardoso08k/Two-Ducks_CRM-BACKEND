import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { UserEntity } from '../domain/entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { UserRoleEnum } from '../domain/enums/user-role.enum';
import { UserStatusEnum } from '../domain/enums/user-status.enum';
import { UserPlatformStatusEnum } from '../domain/enums/user-platform-status.enum';
import { UserInboxStatusEnum } from '../domain/enums/user-inbox-status.enum';
import { UserAvailabilityStatusEnum } from '../domain/enums/user-availability-status.enum';

@Injectable()
export class PrismaUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toEntity(created);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const found = await this.prisma.user.findUnique({ where: { id } });

    return found ? UserMapper.toEntity(found) : null;
  }

  async findByCompanyId(companyId: string): Promise<UserEntity[]> {
    const found = await this.prisma.user.findMany({ where: { companyId } });

    return found.map((user) => UserMapper.toEntity(user));
  }

  async findByName(companyId: string, name: string): Promise<UserEntity[]> {
    const found = await this.prisma.user.findMany({
      where: {
        companyId,
        OR: [
          { firstName: { contains: name, mode: 'insensitive' } },
          { lastName: { contains: name, mode: 'insensitive' } },
        ],
      },
    });

    return found.map((user) => UserMapper.toEntity(user));
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await this.prisma.user.findUnique({ where: { email } });

    return found ? UserMapper.toEntity(found) : null;
  }

  async updateName(
    id: string,
    data: { firstName: string; lastName: string },
  ): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data,
    });

    return UserMapper.toEntity(updated);
  }

  async updateEmail(id: string, email: string): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { email },
    });

    return UserMapper.toEntity(updated);
  }

  async updatePassword(id: string, password: string): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { password },
    });

    return UserMapper.toEntity(updated);
  }

  async updateRole(id: string, role: UserRoleEnum): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    return UserMapper.toEntity(updated);
  }

  async updateStatus(id: string, status: UserStatusEnum): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { status },
    });

    return UserMapper.toEntity(updated);
  }

  async updatePlatformStatus(
    id: string,
    platformStatus: UserPlatformStatusEnum,
  ): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { platformStatus },
    });

    return UserMapper.toEntity(updated);
  }

  async updateInboxStatus(
    id: string,
    inboxStatus: UserInboxStatusEnum,
  ): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { inboxStatus },
    });

    return UserMapper.toEntity(updated);
  }

  async updateAvailabilityStatus(
    id: string,
    availabilityStatus: UserAvailabilityStatusEnum,
  ): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { availabilityStatus },
    });

    return UserMapper.toEntity(updated);
  }

  async updateMaxActiveConversations(
    id: string,
    maxActiveConversations: number,
  ): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { maxActiveConversations },
    });

    return UserMapper.toEntity(updated);
  }

  async updateLastSeenAt(id: string, lastSeenAt: Date): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { lastSeenAt },
    });

    return UserMapper.toEntity(updated);
  }

  async delete(id: string): Promise<true> {
    await this.prisma.user.delete({ where: { id } });

    return true;
  }
}
