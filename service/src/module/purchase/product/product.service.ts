import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { SupplierProductDTO } from '@/dto/purchase/product.dto';
import { SupplierProductQueryListDTO } from './dto/supplier-product-query-list.dto';
import { SupplierProductCheckFieldsDTO } from './dto/supplier-product-check-fields.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

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

  getDetails({ id }: PrimaryKeyDTO) {
    return this.PrismaService.supplierProduct.findUnique({
      where: { id },
      include: {
        unit: true,
        spec: true,
        brand: true,
        category: true,
        supplier: true,
        pictures: true,
      },
    });
  }

  checkFields({ id, name }: SupplierProductCheckFieldsDTO) {
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
        spec: { connect: spec.map((id) => ({ id })) },
        category: { connect: category.map((id) => ({ id })) },
        pictures: { connect: pictures.map((v) => ({ id: v.id })) },
        supplier: { connect: supplier.map((id) => ({ id })) },
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
      target.spec.map((v) => v.id),
      true,
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
    return this.PrismaService.supplierProduct.update({
      where: { id },
      data: {
        ...data,
        spec: { connect: specInsert, disconnect: specDel },
        category: { connect: categoryInsert, disconnect: categoryDel },
        supplier: { connect: supplierInsert, disconnect: supplierDel },
        pictures: { connect: picturesInsert, disconnect: picturesDel },
      },
    });
  }
}
