import { Injectable } from '@nestjs/common';
import { LogService } from '@/common/log/log.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { EncryptionService } from '@/common/encryption/encryption.service';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { AdminUserQuery } from './dto/admin-user-query.dto';
import { ChangeStatusDTO } from '@/dto/common/change-status.dto';
import { AdminUserUpdateDTO } from './dto/admin-user-update.dto';
import { UserCheckFilesDto } from './dto/admin-user-check-fields.dto';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_SYSTEM } from '@/enum/system';

@Injectable()
export class UserService {
  constructor(
    // private readonly UtilsService: UtilsService,
    private readonly LogService: LogService,
    private readonly PrismaService: PrismaService,
    private readonly EncryptionService: EncryptionService,
  ) {}

  async getList(query: AdminUserQuery) {
    const {
      skip,
      take,
      name,
      phone,
      status,
      account,
      createTime,
      departmentId,
    } = query;
    const where = {
      status,
      createTime,
      name: { contains: name },
      phone: { contains: phone },
      account: { contains: account },
      isSuper: ENUM_SYSTEM.SUPER_ADMIN.NOT_SUPER,
      departments: departmentId ? { some: { id: departmentId } } : undefined,
    };
    const [count, list] = await Promise.all([
      this.PrismaService.adminUser.count({ where }),
      this.PrismaService.adminUser.findMany({
        where,
        skip,
        take,
        include: { departments: true },
      }),
    ]);
    return { list, count };
  }

  async getAllAdminUserList() {
    return this.PrismaService.adminUser.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        avatar: true,
        isSuper: true,
        departments: true,
      },
      where: {
        // status: ENUM_COMMON.STATUS.ACTIVATE,
        // isSuper: ENUM_SYSTEM.SUPER_ADMIN.NOT_SUPER,
      },
    });
  }

  async getDetails(where: PrimaryKeyDTO) {
    return this.PrismaService.adminUser.findUnique({
      where,
      include: { departments: true, roles: true },
    });
  }

  async checkFields(dto: UserCheckFilesDto, tips?: boolean) {
    const { id, account, name, phone, email } = dto;
    return await this.PrismaService.checkFieldsRepeat(
      'adminUser',
      { id, account, name, phone, email },
      tips,
    );
  }

  async resetPassword(body: PrimaryKeyDTO) {
    const { id } = body;
    const pwd = String(new Date().valueOf());
    const data = await this.PrismaService.adminUser.update({
      where: { id },
      data: { password: this.EncryptionService.md5(pwd) },
    });
    this.LogService.insert({
      module: ENUM_COMMON.LOG_MODULE.ADMIN_USER,
      type: data.status,
      relationId: data.id,
      remark: `重制了用户密码`,
    });
    return pwd;
  }

  async changeStatus(body: ChangeStatusDTO) {
    const data = await this.PrismaService.changeStatus(body, 'adminUser');
    this.LogService.insert({
      module: ENUM_COMMON.LOG_MODULE.ADMIN_USER,
      type: data.status,
      relationId: data.id,
      remark: `编辑了用户状态${body.remark ? `：${body.remark}` : ''}`,
    });
    return true;
  }

  async insert(dto: AdminUserDTO) {
    const { roles, deps, ...data } = dto;
    const password = this.EncryptionService.decrypt(data.password);
    data.password = this.EncryptionService.md5(password);
    return this.PrismaService.adminUser.create({ data });
  }

  update(dto: AdminUserUpdateDTO) {
    const { id, ...data } = dto;
    return this.PrismaService.adminUser.update({ where: { id }, data });
  }
}
