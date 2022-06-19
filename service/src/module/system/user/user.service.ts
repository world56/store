import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { AdminUserQuery } from './dto/admin-user-query.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AdminUserUpdateDTO } from './dto/admin-user-update.dto';
import { UserCheckFilesDto } from './dto/admin-user-check-fields.dto';
import { EncryptionService } from '@/common/encryption/encryption.service';
import { AdminUserStatusChangeDto } from './dto/admin-user-status-change.dto';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_SYSTEM } from '@/enum/system';


@Injectable()
export class UserService {
  constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
    private readonly EncryptionService: EncryptionService,
  ) {}

  async getList(query: AdminUserQuery) {
    const { name, account, phone, status, skip, take, departmentId, time } =
      query;
    let userIds: number[] = [];
    if (departmentId) {
      const list = await this.PrismaService.relDepartmentOnAdminUser.findMany({
        where: { departmentId },
      });
      userIds = list.map((v) => v.adminUserId);
    }
    const search = {
      where: {
        status,
        name: { contains: name },
        phone: { contains: phone },
        account: { contains: account },
        isSuper: ENUM_SYSTEM.SUPER_ADMIN.NOT_SUPER,
        id: { in: userIds.length ? userIds : undefined },
        createTime: time
          ? { gte: new Date(time[0]), lt: new Date(time[1]) }
          : undefined,
      },
    };
    const [count, list] = await Promise.all([
      this.PrismaService.adminUser.count(search),
      this.PrismaService.adminUser.findMany({
        ...search,
        skip,
        take,
      }),
    ]);
    return { list, count };
  }

  async getAllAdminUserList() {
    return this.PrismaService.adminUser.findMany({
      select: { id: true, name: true },
      where: {
        status: ENUM_COMMON.STATUS.ACTIVATE,
        isSuper: ENUM_SYSTEM.SUPER_ADMIN.NOT_SUPER,
      },
    });
  }

  async getDetails(where: PrimaryKeyDTO) {
    const relWhere = { adminUserId: where.id };
    const [user, roles, departments] = await Promise.all([
      this.PrismaService.adminUser.findUnique({ where }),
      this.PrismaService.relAdminUserRole.findMany({ where: relWhere }),
      this.PrismaService.relDepartmentOnAdminUser.findMany({ where: relWhere }),
    ]);
    return {
      ...user,
      roles: roles.map((v) => v.roleId),
      deps: departments.map((v) => v.departmentId),
    };
  }

  async checkFields(
    { id, account, name, phone, email }: UserCheckFilesDto,
    tips?: boolean,
  ) {
    return await this.PrismaService.checkFieldsRepeat(
      'adminUser',
      { id, account, name, phone, email },
      tips,
    );
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
      const { roles, deps, ...data } = info;
      const password = this.EncryptionService.decrypt(data.password);
      data.password = this.EncryptionService.md5(password);
      const { id: adminUserId } = await prisma.adminUser.create({ data });
      if (roles?.length) {
        await prisma.relAdminUserRole.createMany({
          data: roles.map((roleId) => ({ roleId, adminUserId })),
        });
      }
      if (deps?.length) {
        await prisma.relDepartmentOnAdminUser.createMany({
          data: deps.map((departmentId) => ({ departmentId, adminUserId })),
        });
      }
      return true;
    });
  }

  async update(info: AdminUserUpdateDTO) {
    return await this.PrismaService.$transaction(async (prisma) => {
      const { id, deps, roles, ...data } = info;
      const handle = [];
      const [relRoles, relDeps] = await Promise.all([
        prisma.relAdminUserRole.findMany({
          where: { adminUserId: id },
        }),
        prisma.relDepartmentOnAdminUser.findMany({
          where: { adminUserId: id },
        }),
      ]);

      if (roles?.length) {
        const [roleInsert, roleDel] = this.UtilsService.filterArrayRepeatKeys(
          roles,
          relRoles.map((v) => v.roleId),
        );
        if (roleInsert.length) {
          handle.push(
            prisma.relAdminUserRole.createMany({
              data: roleInsert.map((roleId) => ({ roleId, adminUserId: id })),
            }),
          );
        }
        if (roleDel.length) {
          handle.push(
            prisma.relAdminUserRole.deleteMany({
              where: { roleId: { in: roleDel }, adminUserId: id },
            }),
          );
        }
      }
      if (deps?.length) {
        const [depInsert, depDel] = this.UtilsService.filterArrayRepeatKeys(
          deps,
          relDeps.map((v) => v.departmentId),
        );
        if (depInsert.length) {
          handle.push(
            prisma.relDepartmentOnAdminUser.createMany({
              data: depInsert.map((departmentId) => ({
                adminUserId: id,
                departmentId,
              })),
            }),
          );
        }
        if (depDel.length) {
          handle.push(
            prisma.relDepartmentOnAdminUser.deleteMany({
              where: { departmentId: { in: depDel }, adminUserId: id },
            }),
          );
        }
      }
      handle.length && (await Promise.all(handle));
      data.remark = data.remark ? data.remark : null;
      await this.PrismaService.adminUser.update({ where: { id }, data });
      return true;
    });
  }
}
