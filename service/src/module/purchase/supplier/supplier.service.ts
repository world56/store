import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PurchaseSupplierDTO } from '@/dto/purchase-supplier.dto';
import { SupplierQueryListDTO } from './dto/supplier-query-list.dto';
import { SupplierCheckFieldsDTO } from './dto/supplier-check-fields.dto';

@Injectable()
export class SupplierService {
  public constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getList(query: SupplierQueryListDTO) {
    const { name, category, contactsName, phone, skip, take } = query;
    const param = {
      skip,
      take,
      where: {
        name: { contains: name },
        type: { some: { id: category } },
        AND: [
          { contacts: { some: { phone: { contains: phone } } } },
          { contacts: { some: { name: { contains: contactsName } } } },
        ],
      },
    };
    const [count, list] = await Promise.all([
      this.PrismaService.purchaseSupplier.count(param),
      this.PrismaService.purchaseSupplier.findMany({
        ...param,
        include: { contacts: true, type: true },
      }),
    ]);
    return { count, list };
  }

  details({ id }: PrimaryKeyDTO) {
    return this.PrismaService.purchaseSupplier.findUnique({
      where: { id },
      include: {
        files: true,
        contacts: true,
        type: { select: { id: true, name: true } },
      },
    });
  }

  async check({ id, name }: SupplierCheckFieldsDTO, throwError?: boolean) {
    return await this.PrismaService.checkFieldsRepeat(
      'purchaseSupplier',
      { id, name },
      throwError,
    );
  }

  async insert(data: PurchaseSupplierDTO) {
    const { contacts, type, ...dto } = data;
    await this.check(dto, true);
    return this.PrismaService.purchaseSupplier.create({
      data: {
        ...dto,
        contacts: { createMany: { data: contacts } },
        type: { connect: type.map((id) => ({ id })) },
      },
    });
  }

  async update(dto: PurchaseSupplierDTO) {
    const { id, ...data } = dto;
    await this.check(dto, true);
    const target = await this.PrismaService.purchaseSupplier.findUnique({
      where: { id },
      include: { type: true, contacts: true, files: true },
    });
    const [typeInsert, typeDel] = this.UtilsService.filterArrayRepeatKeys(
      dto.type,
      target.type.map((v) => v.id),
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
        type: { connect: typeInsert, deleteMany: typeDel },
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
