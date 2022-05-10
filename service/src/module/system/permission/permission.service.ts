import { Prisma } from '@prisma/client';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { PermissionDTO } from '@/dto/permission.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PermissionCheckRepeat } from './dto/permission-check-repeat';
import { PermissionQueryListDto } from './dto/permission-query-list.dto';
import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { ENUM_COMMON } from '@/enum/common';

@Injectable()
export class PermissionService {
  constructor(
    private readonly UtilsServer: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getPermissionList(query: PermissionQueryListDto) {
    let where = '';
    const params = Object.entries(query).filter(
      ([k, v]) => !this.UtilsServer.isVoid(v),
    );
    if (params.length) {
      where += 'WHERE ';
      params.forEach(([k, v]) => {
        if (!this.UtilsServer.isVoid(v)) {
          where += `p.${k} ${k !== 'status' ? `LIKE "%${v}%"` : ` = ${v}`}`;
        }
      });
    }
    return await this.PrismaService.$queryRawUnsafe(`
      SELECT 
       p.parent_id AS parentId, p.* , (CASE f.status WHEN 0 THEN false ELSE true END) AS fStatus
      FROM 
        permission AS p
      LEFT OUTER JOIN
        permission AS f ON p.parent_id = f.id
      ${where}`);
  }

  async getDetails(where: PrimaryKeyDTO) {
    return await this.PrismaService.permission.findUnique({ where });
  }

  async findSonTreeList(id: number) {
    const list = await this.PrismaService.$queryRaw<{ id: number }[]>(
      Prisma.sql`
        WITH RECURSIVE ids AS (
          SELECT id FROM permission WHERE parent_id = ${id}
          UNION ALL
          SELECT p.id FROM permission AS p, ids AS s WHERE p.parent_id = s.id
        )
        SELECT id FROM ids;
      `,
    );
    return [id, ...list.map((v) => v.id)];
  }

  async checkRepeat(OR: PermissionCheckRepeat, throwError?: boolean) {
    const { id, name, code } = OR;
    return await this.PrismaService.checkFieldsRepeat(
      'permission',
      { id, name, code },
      throwError,
    );
  }

  async insert(data: PermissionDTO) {
    await this.checkRepeat(data, true);
    return await this.PrismaService.permission.create({ data });
  }

  async update(data: PermissionDTO) {
    const { id, ...other } = data;
    await this.checkRepeat(data, true);
    await this.PrismaService.$transaction(async (prisma) => {
      other.parentId = other.parentId ? other.parentId : null;
      const [prev] = await Promise.all([
        prisma.permission.findUnique({ where: { id } }),
        prisma.permission.update({ where: { id }, data: other }),
      ]);
      if (
        other.status !== prev.status &&
        other.status === ENUM_COMMON.STATUS.FREEZE
      ) {
        const ids = await this.findSonTreeList(id);
        if (ids?.length) {
          await prisma.permission.updateMany({
            where: { id: { in: ids } },
            data: { status: other.status },
          });
        }
      }
    });
    return true;
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
