import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ArrangementQueryListDTO } from './dto/arrangement-list-query';
import { WarehouseArrangementDTO } from '@/dto/warehouse-arrangement.dto';
import { PrimaryKeyDTO } from '@/dto/common.dto';

@Injectable()
export class ArrangementService {
  constructor(private readonly PrismaService: PrismaService) {}

  async getList(query: ArrangementQueryListDTO) {
    const { name, status, skip, take } = query;
    const [count, list] = await Promise.all([
      this.PrismaService.warehouseArrangement.count(),
      this.PrismaService.warehouseArrangement.findMany({
        where: { status, name: { contains: name } },
        skip,
        take,
      }),
    ]);
    return { count, list };
  }

  async getDetails({ id }: PrimaryKeyDTO) {
    return this.PrismaService.warehouseArrangement.findUnique({
      where: { id },
    });
  }

  async checkFields({ id, name }: WarehouseArrangementDTO, tips?: boolean) {
    return await this.PrismaService.checkFieldsRepeat(
      'warehouseArrangement',
      { id, name },
      tips,
    );
  }

  async inseret(data: WarehouseArrangementDTO) {
    return await this.PrismaService.warehouseArrangement.create({ data });
  }

  async update(info: WarehouseArrangementDTO) {
    const { id, ...data } = info;
    await this.checkFields(info, true);
    await this.PrismaService.warehouseArrangement.update({
      where: { id },
      data,
    });
  }

  async remove({ id }: PrimaryKeyDTO) {
    return await this.PrismaService.warehouseArrangement.delete({
      where: { id },
    });
  }
}
