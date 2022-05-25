import { Injectable } from '@nestjs/common';
import { CategoryDTO } from '@/dto/category.dto';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryListQueryDTO } from './dto/category-list-query.dto';
import { CategoryCheckFieldDTO } from './dto/category-check-field.dto';

@Injectable()
export class CategoryService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList(query: CategoryListQueryDTO) {
    const { type } = query;
    const fields = Array.isArray(type) ? type : [type];
    return await Promise.all(
      fields.map((type) =>
        this.PrismaService.categorys.findMany({
          where: { type },
        }),
      ),
    );
  }

  async checkFields({ id, name, type }: CategoryCheckFieldDTO, tips?: boolean) {
    const data = await this.PrismaService.checkFieldsRepeat(
      'categorys',
      { id, name, WHERE: { type } },
      tips,
    );
    return data;
  }

  async getDetails({ id }: PrimaryKeyDTO) {
    return this.PrismaService.categorys.findUnique({
      where: { id },
    });
  }

  async insert(data: CategoryDTO) {
    const { id, name } = data;
    await this.checkFields({ id, name }, true);
    await this.PrismaService.categorys.create({ data });
    return true;
  }

  async update(info: CategoryDTO) {
    const { id, ...data } = info;
    await this.checkFields({ id, name: data.name }, true);
    await this.PrismaService.categorys.update({ where: { id }, data });
    return true;
  }

}
