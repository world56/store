import { RoleDto } from '@/dto/role.dto';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { RuleQueryListDTO } from './dto/rule-query-list.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RuleCheckFieldsDTO } from './dto/rule-check-fields.dto';
import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { ENUM_COMMON } from '@/enum/common';

@Injectable()
export class RoleService {
  constructor(
    private readonly UtilsServer: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getRoleList(query: RuleQueryListDTO) {
    const { skip, take, permissionId, name, status } = query;
    let roleIds = [];
    if (permissionId) {
      const relation = await this.PrismaService.relRolePermission.findMany({
        where: { permissionId },
      });
      roleIds = relation.map((v) => v.roleId);
    }
    const params = {
      where: {
        status,
        name: { contains: name },
        id: { in: roleIds.length ? roleIds : permissionId ? [] : undefined },
      },
    };
    const [count, list] = await Promise.all([
      this.PrismaService.role.count(params),
      this.PrismaService.role.findMany({
        ...params,
        skip,
        take,
      }),
    ]);
    return { list, count };
  }

  async getAll() {
    return await this.PrismaService.role.findMany({
      where: { status: ENUM_COMMON.STATUS.ACTIVATE },
    });
  }

  async checkField(data: RuleCheckFieldsDTO, tips?: boolean) {
    const { name, id } = data;
    const list = await this.PrismaService.role.findMany({
      where: { OR: [{ name }, { id }] },
    });
    const isRepeat = this.UtilsServer.isRepeat(list, id);
    if (tips && isRepeat) {
      throw new PreconditionFailedException('字段值存在重复，无法保存');
    }
    return isRepeat;
  }

  async getDetails(query: PrimaryKeyDTO) {
    const { id } = query;
    const [data, ids] = await Promise.all([
      this.PrismaService.role.findUnique({ where: { id } }),
      this.PrismaService.relRolePermission.findMany({
        where: { roleId: id },
      }),
    ]);
    return { ...data, permissionId: ids.map((v) => v.permissionId) };
  }

  async insert(info: Omit<RoleDto, 'id'>) {
    await this.checkField(info, true);
    const { permissionId, ...data } = info;
    return await this.PrismaService.$transaction(async (prisma) => {
      const { id: roleId } = await prisma.role.create({ data });
      await prisma.relRolePermission.createMany({
        data: permissionId.map((permissionId) => ({ permissionId, roleId })),
      });
      return true;
    });
  }

  async update(info: RoleDto) {
    await this.checkField(info, true);
    const { id: roleId, remark } = info;
    info.remark = remark ? remark : null;
    return await this.PrismaService.$transaction(async (prisma) => {
      const relation = await prisma.relRolePermission.findMany({
        where: { roleId },
      });
      const [insert, remove] = this.UtilsServer.filterArrayRepeatKeys(
        info.permissionId,
        relation.map((v) => v.permissionId),
      );
      if (info.permissionId.length) {
        if (insert?.length) {
          await prisma.relRolePermission.createMany({
            data: insert.map((permissionId) => ({ permissionId, roleId })),
          });
        }
        if (remove.length) {
          await prisma.relRolePermission.deleteMany({
            where: { permissionId: { in: remove } },
          });
        }
      } else {
        await prisma.relRolePermission.deleteMany({ where: { roleId } });
      }
      const { permissionId, ...data } = info;
      await prisma.role.update({ where: { id: roleId }, data });
      return true;
    });
  }

  async remove({ id }: PrimaryKeyDTO) {
    const adminUser = await this.PrismaService.relAdminUserRole.findFirst({
      where: { roleId: id },
    });
    if (adminUser) {
      throw new PreconditionFailedException('与用户在关联，无法删除');
    }
    await this.PrismaService.$transaction([
      this.PrismaService.role.delete({ where: { id } }),
      this.PrismaService.relRolePermission.deleteMany({
        where: { roleId: { in: id } },
      }),
    ]);
    return true;
  }
}
