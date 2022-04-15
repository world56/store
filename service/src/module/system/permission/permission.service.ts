import { PrimaryKeyDTO } from '@/dto/common.dto';
import { PermissionDTO } from '@/dto/permission.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PermissionCheckRepeat } from './dto/permission-check-repeat';
import { PermissionQueryListDto } from './dto/permission-query-list.dto';
import { Injectable, PreconditionFailedException } from '@nestjs/common';

@Injectable()
export class PermissionService {
  constructor(
    private readonly UtilsServer: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getPermissionList(
    query: Omit<PermissionQueryListDto, 'currentPage' | 'pageSize'>,
  ) {
    const { skip, take, ...where } = query;
    const search = {
      where: {
        status: where.status,
        name: { contains: where.name },
        code: { contains: where.code },
      },
    };
    const count = await this.PrismaService.permission.count(search);
    const list = await this.PrismaService.permission.findMany({
      ...search,
      take,
      skip,
    });
    return { list, count };
  }

  async findAll() {
    return this.PrismaService.permission.findMany();
  }

  async getDetails(where: PrimaryKeyDTO) {
    return await this.PrismaService.permission.findUnique({ where });
  }

  async checkRepeat(OR: PermissionCheckRepeat, throwError?: boolean) {
    const { id, name, code } = OR;
    const list = await this.PrismaService.permission.findMany({
      where: { OR: { id, name, code } },
    });
    const isRepeat = this.UtilsServer.isRepeat(list, id);
    if (throwError && isRepeat) {
      throw new PreconditionFailedException('字段值存在重复，无法保存');
    }
    return isRepeat;
  }

  async insert(data: PermissionDTO) {
    await this.checkRepeat(data, true);
    return await this.PrismaService.permission.create({ data });
  }

  async update(data: PermissionDTO) {
    const { id, ...other } = data;
    await this.checkRepeat(data, true);
    other.parentId = other.parentId ? other.parentId : null;
    return await this.PrismaService.permission.update({
      where: { id },
      data: other,
    });
  }

  async delete(where: PrimaryKeyDTO) {
    const relation = await this.PrismaService.permission.findFirst({
      where: { parentId: where.id },
    });
    if (relation) {
      throw new PreconditionFailedException('存在层级关联关系，无法删除');
    }
    const realtionRole = await this.PrismaService.relRolePermission.findFirst({
      where: { permissionId: where.id },
    });
    if (realtionRole) {
      throw new PreconditionFailedException('与角色存在关联关系，无法删除');
    }
    return this.PrismaService.permission.delete({ where });
  }
}
