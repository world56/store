import { RoleDto } from '@/dto/system/role.dto';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { RuleQueryListDTO } from './dto/rule-query-list.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';

import { ENUM_COMMON } from '@/enum/common';

@Injectable()
export class RoleService {
  constructor(
    private readonly UtilsServer: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getRoleList(query: RuleQueryListDTO) {
    const { skip, take, permissionId, name, status } = query;
    const where = {
      status,
      name: { contains: name },
      permissions: permissionId ? { some: { id: permissionId } } : undefined,
    };
    const [count, list] = await Promise.all([
      this.PrismaService.role.count({ where }),
      this.PrismaService.role.findMany({ skip, take, where }),
    ]);
    return { list, count };
  }

  getAll() {
    return this.PrismaService.role.findMany({
      where: { status: ENUM_COMMON.STATUS.ACTIVATE },
    });
  }

  checkField(dto: CheckFieldsIsRepeatDTO, tips?: boolean) {
    const { id, name } = dto;
    return this.PrismaService.checkFieldsRepeat('role', { name, id }, tips);
  }

  getDetails(query: PrimaryKeyDTO) {
    const { id } = query;
    return this.PrismaService.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
  }

  async insert(info: Omit<RoleDto, 'id'>) {
    const { permissionId = [], ...update } = info;
    const connect = permissionId.map((id) => ({ id }));
    return this.PrismaService.role.create({
      data: {
        ...update,
        permissions: connect.length ? { connect } : undefined,
      },
    });
  }

  async update(dto: RoleDto) {
    const { id, permissionId, ...update } = dto;
    update.remark = update.remark ? update.remark : null;
    const target = await this.PrismaService.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
    const [connect, disconnect] = this.UtilsServer.filterArrayRepeatKeys(
      permissionId,
      target.permissions.map((v) => v.id),
      true,
    );
    return this.PrismaService.role.update({
      where: { id },
      data: { ...update, permissions: { connect, disconnect } },
    });
  }

  async remove({ id }: PrimaryKeyDTO) {
    const role = await this.PrismaService.role.findUnique({
      where: { id },
      include: { users: true },
    });
    if (role.users.length) {
      throw new PreconditionFailedException('与用户在关联，无法删除');
    }
    return await this.PrismaService.role.delete({ where: { id } });
  }
}
