import { Injectable } from '@nestjs/common';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { SpecParameterEditDTO } from './dto/spec-parameter-edit.dto';
import { SpecParameterQueryDTO } from './dto/spec-parameter-query.dto';
import { SpecParameterGetDetailsDTO } from './dto/spec-parameter-get-details.dto';
import { SpecParameterRelationCategoryDTO } from './dto/spec-parameter-relation-category.dto';
import { SpecParameterCheckFieldsDTO } from './dto/spec-parameter-check.dto';

@Injectable()
export class SpecParameterService {
  public constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getList(query: SpecParameterQueryDTO) {
    const { take, skip, name, categoryId } = query;
    const where = {
      name: { contains: name },
      spec: categoryId ? { some: { id: categoryId } } : undefined,
    };
    const [count, list] = await Promise.all([
      this.PrismaService.productSpecParameter.count({ where }),
      this.PrismaService.productSpecParameter.findMany({
        take,
        skip,
        where,
        include: { spec: true },
      }),
    ]);
    return { count, list };
  }

  getAll() {
    return this.PrismaService.productSpecParameter.findMany({
      include: { spec: true },
    });
  }

  detalis(query: SpecParameterGetDetailsDTO) {
    return this.PrismaService.productSpecParameter.findMany({
      where: { id: { in: query.ids } },
      include: { spec: true },
    });
  }

  checkFields(dto: SpecParameterCheckFieldsDTO, tips?: boolean) {
    const { id, name } = dto;
    return this.PrismaService.checkFieldsRepeat(
      'productSpecParameter',
      { id, name },
      tips,
    );
  }

  async relation({ id, spec }: SpecParameterRelationCategoryDTO) {
    const target = await this.PrismaService.productSpecParameter.findUnique({
      where: { id },
      include: { spec: true },
    });
    const [connect, disconnect] = this.UtilsService.filterArrayRepeatKeys(
      spec,
      target.spec.map((v) => v.id),
      true,
    );
    return this.PrismaService.productSpecParameter.update({
      where: { id },
      data: { spec: { connect, disconnect } },
    });
  }

  inserts(data: SpecParameterEditDTO) {
    return this.PrismaService.productSpecParameter.createMany({
      data: data.parameter,
    });
  }

  updates(dto: SpecParameterEditDTO) {
    return Promise.all(
      dto.parameter.map((data) =>
        this.PrismaService.productSpecParameter.update({
          where: { id: data.id },
          data,
        }),
      ),
    );
  }
}
