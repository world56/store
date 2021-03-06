import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { SupplierProductDTO } from '@/dto/purchase/product.dto';
import { SupplierProductQuery } from './dto/supplier-product-query.dto';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';
import { SupplierProductQueryListDTO } from './dto/supplier-product-query-list.dto';

import { ENUM_COMMON } from '@/enum/common';

@Injectable()
export class ProductService {
  constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  query(query: SupplierProductQuery) {
    const { name, supplierId } = query;
    return this.PrismaService.supplierProduct.findMany({
      where: {
        name: { contains: name },
        status: ENUM_COMMON.STATUS.ACTIVATE,
        supplier: { some: { id: supplierId } },
      },
      include: {
        pictures: true,
        brand: true,
        unit: true,
        spec: {
          where: { deleted: false },
          include: { specParameter: true },
        },
      },
    });
  }

  async getList(query: SupplierProductQueryListDTO) {
    const { name, branId, supplierId, categoryId, status, skip, take } = query;
    const where = {
      status,
      name: { contains: name },
      brand: { id: branId },
      supplier: supplierId ? { some: { id: supplierId } } : undefined,
      category: categoryId ? { some: { id: categoryId } } : undefined,
    };
    const [count, list] = await Promise.all([
      this.PrismaService.supplierProduct.count({ where }),
      this.PrismaService.supplierProduct.findMany({
        skip,
        take,
        where,
        include: { category: true, brand: true },
      }),
    ]);
    return { count, list };
  }

  async getDetails({ id }: PrimaryKeyDTO) {
    const data = await this.PrismaService.supplierProduct.findUnique({
      where: { id },
      include: {
        unit: true,
        brand: true,
        category: true,
        supplier: true,
        pictures: true,
        spec: {
          where: { deleted: false },
          include: { specParameter: true },
        },
      },
    });
    return {
      ...data,
      spec: data.spec.map((v) => v.specParameter),
    };
  }

  checkFields({ id, name }: CheckFieldsIsRepeatDTO) {
    return this.PrismaService.checkFieldsRepeat('supplierProduct', {
      id,
      name,
    });
  }

  insert(dto: SupplierProductDTO) {
    const { spec, category, supplier, pictures, ...data } = dto;
    return this.PrismaService.supplierProduct.create({
      data: {
        ...data,
        category: { connect: category.map((id) => ({ id })) },
        supplier: { connect: supplier.map((id) => ({ id })) },
        pictures: { connect: pictures.map((v) => ({ id: v.id })) },
        spec: {
          createMany: { data: spec.map((id) => ({ specParameterId: id })) },
        },
      },
    });
  }

  async update(dto: SupplierProductDTO) {
    const { id, spec, category, supplier, pictures, ...data } = dto;
    const target = await this.PrismaService.supplierProduct.findUnique({
      where: { id },
      include: {
        spec: true,
        category: true,
        supplier: true,
        pictures: true,
      },
    });
    const [specInsert, specDel] = this.UtilsService.filterArrayRepeatKeys(
      spec,
      target.spec.filter((v) => !v.deleted).map((v) => v.specParameterId),
    );
    const [categoryInsert, categoryDel] =
      this.UtilsService.filterArrayRepeatKeys(
        category,
        target.category.map((v) => v.id),
        true,
      );
    const [supplierInsert, supplierDel] =
      this.UtilsService.filterArrayRepeatKeys(
        supplier,
        target.supplier.map((v) => v.id),
        true,
      );
    const [picturesInsert, picturesDel] =
      this.UtilsService.filterArrayRepeatKeys(
        pictures.map((v) => v.id),
        target.pictures.map((v) => v.id),
        true,
      );
    return this.PrismaService.$transaction(async (db) => {
      return Promise.all([
        Promise.all(
          specInsert.map((specParameterId) =>
            db.relPurchaseProductOnSpec.upsert({
              where: {
                specParameterId_supplierProductId: {
                  specParameterId,
                  supplierProductId: id,
                },
              },
              create: { supplierProductId: id, specParameterId },
              update: { deleted: false },
            }),
          ),
        ),
        db.relPurchaseProductOnSpec.updateMany({
          where: { supplierProductId: id, specParameterId: { in: specDel } },
          data: { deleted: true },
        }),
        db.supplierProduct.update({
          where: { id },
          data: {
            ...data,
            category: { connect: categoryInsert, disconnect: categoryDel },
            supplier: { connect: supplierInsert, disconnect: supplierDel },
            pictures: { connect: picturesInsert, disconnect: picturesDel },
          },
        }),
      ]);
    });
  }
}
