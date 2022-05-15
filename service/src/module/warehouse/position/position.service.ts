import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { WarehousePositionDTO } from '@/dto/warehouse-position.dto';
import { WarehousePositionQueryListDTO } from './dto/warehouse-position-list-query';

@Injectable()
export class PositionService {
  constructor(private readonly PrismaService: PrismaService) {}

  async getList(query: WarehousePositionQueryListDTO) {
    const { name, status, skip, take } = query;
    const findParam = {
      skip,
      take,
      where: { status, name: { contains: name } },
      include: { contacts: { select: { name: true, phone: true } } },
    };
    const [count, list] = await Promise.all([
      this.PrismaService.warehousePosition.count(),
      this.PrismaService.warehousePosition.findMany(findParam),
    ]);
    return { count, list };
  }

  async getAll() {
    return this.PrismaService.warehousePosition.findMany();
  }

  async getDetails({ id }: PrimaryKeyDTO) {
    return this.PrismaService.warehousePosition.findUnique({
      where: { id },
    });
  }

  async checkFields({ id, name }: WarehousePositionDTO, tips?: boolean) {
    return await this.PrismaService.checkFieldsRepeat(
      'warehousePosition',
      { id, name },
      tips,
    );
  }

  async inseret(data: WarehousePositionDTO) {
    return await this.PrismaService.warehousePosition.create({ data });
  }

  async update(info: WarehousePositionDTO) {
    const { id, ...data } = info;
    await this.checkFields(info, true);
    await this.PrismaService.warehousePosition.update({
      where: { id },
      data,
    });
  }

  async remove({ id }: PrimaryKeyDTO) {
    return await this.PrismaService.warehousePosition.delete({
      where: { id },
    });
  }
}
