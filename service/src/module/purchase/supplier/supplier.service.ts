import { LogService } from '@/common/log/log.service';
import { UtilsService } from '@/common/utils/utils.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { SupplierAddFileDTO } from './dto/supplier-edit-file.dto';
import { PurchaseSupplierDTO } from '@/dto/purchase/supplier.dto';
import { SupplierQueryListDTO } from './dto/supplier-query-list.dto';
import { SupplierChangeStatusDTO } from './dto/supplier-change-status.dto';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_PURCHASE } from '@/enum/purchase';

@Injectable()
export class SupplierService {
  public constructor(
    private readonly LogService: LogService,
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  getAll() {
    return this.PrismaService.purchaseSupplier.findMany();
  }

  async getList(query: SupplierQueryListDTO) {
    const param = {
      where: {
        status: query.status,
        name: { contains: query.name },
        phone: { contains: query.companyPhone },
        category: query.category ? { some: { id: query.category } } : undefined,
        product: query.productId
          ? { some: { id: query.productId } }
          : undefined,
        contacts: {
          some: {
            phone: { contains: query.phone },
            name: { contains: query.contactsName },
          },
        },
      },
    };
    const [count, list] = await Promise.all([
      this.PrismaService.purchaseSupplier.count(param),
      this.PrismaService.purchaseSupplier.findMany({
        ...param,
        skip: query.skip,
        take: query.take,
        orderBy: { createTime: 'desc' },
        include: { contacts: true, category: true },
      }),
    ]);
    return { count, list };
  }

  details({ id }: PrimaryKeyDTO) {
    return this.PrismaService.purchaseSupplier.findUnique({
      where: { id },
      include: {
        contacts: true,
        category: true,
        files: { include: { user: { select: { name: true, id: true } } } },
      },
    });
  }

  async check({ id, name }: CheckFieldsIsRepeatDTO, throwError?: boolean) {
    return await this.PrismaService.checkFieldsRepeat(
      'purchaseSupplier',
      { id, name },
      throwError,
    );
  }

  async changeStatus(dto: SupplierChangeStatusDTO) {
    const { id, content, status } = dto;
    const targer = await this.PrismaService.purchaseSupplier.findUnique({
      where: { id },
    });
    if (targer.status === dto.status) {
      throw new ConflictException(
        '改变的状态与当前状态一致，请重新选择状态或刷新页面',
      );
    }
    const data = await this.PrismaService.purchaseSupplier.update({
      where: { id },
      data: { status },
    });
    await this.LogService.insert({
      type: ENUM_PURCHASE.LOG_TYPE.STATUS,
      relationId: data.id,
      module: ENUM_COMMON.LOG_MODULE.SUPPLIER,
      remark: `供应商状态变更为：${data.status ? '激活' : '冻结'} ${
        content || ''
      }`,
    });
  }

  async insert(data: PurchaseSupplierDTO) {
    const { contacts, category, files, ...dto } = data;
    await this.check(dto, true);
    return this.PrismaService.purchaseSupplier.create({
      data: {
        ...dto,
        contacts: { createMany: { data: contacts } },
        category: { connect: category.map((id) => ({ id })) },
        files: { connect: files?.map((v) => ({ id: v.id })) },
      },
    });
  }

  addFile(data: SupplierAddFileDTO) {
    return this.PrismaService.purchaseSupplier.update({
      where: { id: data.id },
      data: { files: { connect: { id: data.file.id } } },
    });
  }

  async update(dto: PurchaseSupplierDTO) {
    const { id, files, ...data } = dto;
    await this.check(dto, true);
    const target = await this.PrismaService.purchaseSupplier.findUnique({
      where: { id },
      include: { category: true, contacts: true, files: true },
    });
    const [categoryInsert, categoryDel] =
      this.UtilsService.filterArrayRepeatKeys(
        dto.category,
        target.category.map((v) => v.id),
        true,
      );
    const [fileInsert, fileDel] = this.UtilsService.filterArrayRepeatKeys(
      dto.files.map((v) => v.id),
      target.files.map((v) => v.id),
      true,
    );
    const [contactsInsert, contactsDel] =
      this.UtilsService.filterArrayRepeatKeys(
        dto.contacts.map((v) => v.id),
        target.contacts.map((v) => v.id),
        true,
      );
    const [updateMany, createMany] = this.UtilsService.filterGrouping(
      data.contacts,
      (v) => v.id,
    );
    return this.PrismaService.purchaseSupplier.update({
      where: { id },
      data: {
        ...data,
        category: { connect: categoryInsert, deleteMany: categoryDel },
        files: { connect: fileInsert, deleteMany: fileDel },
        contacts: {
          connect: contactsInsert,
          deleteMany: contactsDel,
          createMany: { data: createMany },
          updateMany: updateMany.map((data) => ({
            where: { id: data.id },
            data,
          })),
        },
      },
    });
  }
}
