import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { ProductSpecDTO } from '@/dto/product-spec.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { SpecStatusChangeDTO } from './dto/spec-status.dto';
import { SpecQueryListDTO } from './dto/spec-query-list.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { SpectCheckFieldsDTO } from './dto/spec-check-fields.dto';

@Injectable()
export class SpecCategoryService {
  public constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getList(query: SpecQueryListDTO) {
    const { name, status, skip, take, parameterId } = query;
    const where = {
      status,
      name: { contains: name },
      parameter: parameterId ? { some: { id: parameterId } } : undefined,
    };
    const [count, list] = await Promise.all([
      this.PrismaService.productSpec.count({ where }),
      this.PrismaService.productSpec.findMany({
        skip,
        take,
        where,
        include: { parameter: true },
      }),
    ]);
    return { count, list };
  }

  getAll() {
    return this.PrismaService.productSpec.findMany({
      include: { parameter: true },
    });
  }

  details({ id }: PrimaryKeyDTO) {
    return this.PrismaService.productSpec.findUnique({
      where: { id },
      include: { parameter: true },
    });
  }

  async checkFields(query: SpectCheckFieldsDTO, tips?: boolean) {
    const { id, name } = query;
    return this.PrismaService.checkFieldsRepeat(
      'productSpec',
      { id, name },
      tips,
    );
  }

  changeStatus(data: SpecStatusChangeDTO) {
    const { id, status } = data;
    return this.PrismaService.productSpec.update({
      where: { id },
      data: { status },
    });
  }

  async insert(dto: ProductSpecDTO) {
    const { remark, parameter, ...data } = dto;
    return this.PrismaService.productSpec.create({
      data: {
        ...data,
        remark: remark ? remark : null,
        parameter: { connect: parameter.map((id) => ({ id })) },
      },
    });
  }

  async update(dto: ProductSpecDTO) {
    const { id, parameter, ...data } = dto;
    const target = await this.PrismaService.productSpec.findUnique({
      where: { id },
      include: { parameter: { select: { id: true } } },
    });
    const [insert, del] = this.UtilsService.filterArrayRepeatKeys(
      parameter,
      target.parameter.map((v) => v.id),
      true,
    );
    return this.PrismaService.productSpec.update({
      where: { id },
      data: { ...data, parameter: { connect: insert, disconnect: del } },
    });
  }
}
