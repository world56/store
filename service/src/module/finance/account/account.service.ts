import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

import { FinanceAccountQueryListDTO } from './dto/finance-account-query-list.dto';
import { FinanceAccountDTO } from '@/dto/finance/account';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';

@Injectable()
export class AccountService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList({
    skip,
    take,
    accountName,
    accountNumber,
    ...query
  }: FinanceAccountQueryListDTO) {
    const where = {
      ...query,
      accountName: { contains: accountName },
      accountNumber: { contains: accountNumber },
    };
    const [count, list] = await Promise.all([
      this.PrismaService.paymentAccount.count({ where }),
      this.PrismaService.paymentAccount.findMany({
        skip,
        take,
        where,
        include: { supplier: { select: { id: true, name: true } } },
        orderBy: { createTime: 'desc' },
      }),
    ]);
    return { count, list };
  }

  getDetails({ id }: PrimaryKeyDTO) {
    return this.PrismaService.paymentAccount.findUnique({
      where: { id },
    });
  }

  private async checkUniqueness(data: FinanceAccountDTO) {
    const { supplierId, accountName, accountNumber, organizationId } = data;
    const target = await this.PrismaService.paymentAccount.findUnique({
      where: {
        supplierId_accountName_accountNumber_organizationId: {
          supplierId,
          accountName,
          accountNumber,
          organizationId,
        },
      },
    });
    if (target?.id === data.id || !target) {
      return true;
    } else {
      throw new ConflictException('供应商收款账户不得重复，请检查后重新输入');
    }
  }

  async insert(body: FinanceAccountDTO) {
    const { id, supplierId, ...data } = body;
    await this.checkUniqueness(body);
    await this.PrismaService.paymentAccount.create({
      data: {
        ...data,
        supplier: { connect: { id: supplierId } },
      },
    });
    return true;
  }

  async update(body: FinanceAccountDTO) {
    const { id, ...data } = body;
    await this.checkUniqueness(body);
    await this.PrismaService.paymentAccount.update({
      where: { id },
      data: {
        ...data,
        remark: data.remark ? data.remark : null,
      },
    });
    return true;
  }
}
