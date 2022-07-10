import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { DepartmentDTO } from '@/dto/system/department.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { DepartmentQueryListDTO } from './dto/department-query-list.dto';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';

@Injectable()
export class DepartmentService {
  public constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getList(query: DepartmentQueryListDTO) {
    const { skip, take, name } = query;
    const where = { name: { contains: name } };
    const [count, list] = await Promise.all([
      this.PrismaService.department.count({ where }),
      this.PrismaService.department.findMany({
        where,
        skip,
        take,
      }),
    ]);
    return { list, count };
  }

  async getAll() {
    return await this.PrismaService.department.findMany();
  }

  async checkFields({ id, name }: CheckFieldsIsRepeatDTO, tips?: boolean) {
    return await this.PrismaService.checkFieldsRepeat(
      'department',
      { id, name },
      tips,
    );
  }

  async getDetails({ id }: PrimaryKeyDTO) {
    const dep = await this.PrismaService.department.findUnique({
      where: { id },
    });
    const users = await this.PrismaService.relDepartmentOnAdminUser.findMany({
      where: { departmentId: dep.id },
    });
    return { ...dep, users: users.map((v) => v.adminUserId) };
  }

  async intert(info: DepartmentDTO) {
    const { users, ...data } = info;
    await this.checkFields(info, true);
    await this.PrismaService.$transaction(async (prisma) => {
      const { id: departmentId } = await prisma.department.create({ data });
      if (users?.length) {
        await this.PrismaService.relDepartmentOnAdminUser.createMany({
          data: users.map((adminUserId) => ({ adminUserId, departmentId })),
        });
      }
    });
    return true;
  }

  async update(info: DepartmentDTO) {
    await this.checkFields(info, true);
    await this.PrismaService.$transaction(async (prisma) => {
      const { id: departmentId, users, ...data } = info;
      const ids = await prisma.relDepartmentOnAdminUser.findMany({
        where: { departmentId },
      });
      const handle = [];
      const [insert, del] = this.UtilsService.filterArrayRepeatKeys(
        users,
        ids.map((v) => v.adminUserId),
      );
      insert.length &&
        handle.push(
          prisma.relDepartmentOnAdminUser.createMany({
            data: insert.map((adminUserId) => ({ adminUserId, departmentId })),
          }),
        );
      del.length &&
        handle.push(
          prisma.relDepartmentOnAdminUser.deleteMany({
            where: { departmentId, adminUserId: { in: del } },
          }),
        );
      data.remark = data.remark ? data.remark : null;
      handle.length && (await Promise.all(handle));
      await prisma.department.update({ where: { id: departmentId }, data });
    });
    return true;
  }

  async remove({ id }: PrimaryKeyDTO) {
    const target = await this.PrismaService.relDepartmentOnAdminUser.findFirst({
      where: { departmentId: id },
    });
    if (target) {
      throw new PreconditionFailedException(
        '存在关联用户，请取消关联后在进行删除',
      );
    }
    await this.PrismaService.department.delete({ where: { id } });
    return true;
  }
}
