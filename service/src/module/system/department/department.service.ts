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
    const { skip, take, name, userId } = query;
    const where = {
      name: { contains: name },
      users: userId ? { some: { id: userId } } : undefined,
    };
    const [count, list] = await Promise.all([
      this.PrismaService.department.count({ where }),
      this.PrismaService.department.findMany({
        skip,
        take,
        where,
        include: { users: { select: { id: true, name: true } } },
      }),
    ]);
    return { list, count };
  }

  async getAll() {
    return await this.PrismaService.department.findMany();
  }

  async checkFields(dto: CheckFieldsIsRepeatDTO, tips?: boolean) {
    const { id, name } = dto;
    return await this.PrismaService.checkFieldsRepeat(
      'department',
      { id, name },
      tips,
    );
  }

  getDetails({ id }: PrimaryKeyDTO) {
    return this.PrismaService.department.findUnique({
      where: { id },
      include: { users: true },
    });
  }

  intert(dto: DepartmentDTO) {
    const { users, ...data } = dto;
    return this.PrismaService.department.create({
      data: {
        ...data,
        users: users?.length
          ? { connect: users.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  async update(dto: DepartmentDTO) {
    const { id, ...update } = dto;
    const target = await this.PrismaService.department.findUnique({
      where: { id },
      include: { users: true },
    });
    const [insert, del] = this.UtilsService.filterArrayRepeatKeys(
      update.users,
      target.users.map((v) => v.id),
      true,
    );
    return this.PrismaService.department.update({
      where: { id },
      data: { ...update, users: { connect: insert, disconnect: del } },
    });
  }

  async remove({ id }: PrimaryKeyDTO) {
    const dep = await this.PrismaService.department.findFirst({
      where: { id },
      include: { users: true },
    });
    if (dep.users.length) {
      throw new PreconditionFailedException(
        '存在关联用户，请取消关联后在进行删除',
      );
    }
    await this.PrismaService.department.delete({ where: { id } });
    return true;
  }
}
