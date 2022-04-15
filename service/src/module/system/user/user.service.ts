import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { AdminUserDTO } from '@/dto/admin-user.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AdminUserQuery } from './dto/admin-user-query.dto';
import { UserCheckFilesDto } from './dto/admin-user-check-fields.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { ENUM_SYSTEM } from '@/enum/system';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { EncryptionService } from '@/common/encryption/encryption.service';
import { AdminUserUpdateDTO } from './dto/admin-user-update.dto';
import { AdminUserStatusChangeDto } from './dto/admin-user-status-change.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
    private readonly EncryptionService: EncryptionService,
  ) {}

  async getList(query: AdminUserQuery) {
    const { name, account, phone, status, skip, take } = query;
    const search = {
      where: {
        status,
        name: { contains: name },
        phone: { contains: phone },
        account: { contains: account },
        isSuper: ENUM_SYSTEM.SUPER_ADMIN.NOT_SUPER,
      },
    };
    const count = await this.PrismaService.adminUser.count(search);
    const list = await this.PrismaService.adminUser.findMany({
      ...search,
      skip,
      take,
    });
    return { list, count };
  }

  async getDetails(where: PrimaryKeyDTO) {
    const user = await this.PrismaService.adminUser.findUnique({ where });
    const roles = await this.PrismaService.relAdminUserRole.findMany({
      where: { adminUserId: where.id },
    });
    return { ...user, roles: roles.map((v) => v.roleId) };
  }

  async check(query: UserCheckFilesDto, tips?: boolean) {
    const { id, account, name, phone, email } = query;
    const list = await this.PrismaService.adminUser.findMany({
      where: { OR: [{ account }, { name }, { phone }, { email }] },
    });
    const isRepeat = this.UtilsService.isRepeat(list, id);
    if (tips && isRepeat) {
      throw new PreconditionFailedException('该字段重复，无法保存');
    }
    return isRepeat;
  }

  async resetPassword(body: PrimaryKeyDTO) {
    const { id } = body;
    const pwd = String(new Date().valueOf());
    await this.PrismaService.adminUser.update({
      where: { id },
      data: { password: this.EncryptionService.md5(pwd) },
    });
    return pwd;
  }

  async freezeStatus({ id, status }: AdminUserStatusChangeDto) {
    await this.PrismaService.adminUser.update({
      where: { id },
      data: { status },
    });
    return true;
  }

  async insert(info: AdminUserDTO) {
    return await this.PrismaService.$transaction(async (prisma) => {
      const { roles, ...data } = info;
      const password = this.EncryptionService.decrypt(data.password);
      data.password = this.EncryptionService.md5(password);
      const { id: adminUserId } = await prisma.adminUser.create({ data });
      await prisma.relAdminUserRole.createMany({
        data: roles.map((roleId) => ({ roleId, adminUserId })),
      });
      return true;
    });
  }

  async update(info: AdminUserUpdateDTO) {
    return await this.PrismaService.$transaction(async (prisma) => {
      const { id, roles, ...data } = info;
      const ids = await prisma.relAdminUserRole.findMany({
        where: { adminUserId: id },
      });
      const [insert, del] = this.UtilsService.filterArrayRepeatKeys(
        roles,
        ids.map((v) => v.roleId),
      );
      if (insert.length) {
        await prisma.relAdminUserRole.createMany({
          data: insert.map((roleId) => ({ roleId, adminUserId: id })),
        });
      }
      if (del.length) {
        await prisma.relAdminUserRole.deleteMany({
          where: { roleId: { in: del } },
        });
      }
      data.remark = data.remark ? data.remark : null;
      await this.PrismaService.adminUser.update({ where: { id }, data });
      return true;
    });
  }
}
