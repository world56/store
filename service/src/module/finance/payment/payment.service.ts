import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PaymentQueryListDTO } from './dto/payment-query-list.dto';
import { PaymentConfirmDTO } from './dto/paymeny-confirm.dto';

@Injectable()
export class PaymentService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList({ take, skip, ...where }: PaymentQueryListDTO) {
    const [count, list] = await Promise.all([
      this.PrismaService.financialPayables.count({ where }),
      this.PrismaService.financialPayables.findMany({
        where,
        take,
        skip,
      }),
    ]);
    return { count, list };
  }

  async confirm(body: PaymentConfirmDTO) {
    return true;
  }
}
