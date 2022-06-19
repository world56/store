import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';

@Injectable()
export class OrderService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList() {
    const [count, list] = await Promise.all([
      this.PrismaService.purchaseOrder.count(),
      this.PrismaService.purchaseOrder.findMany(),
    ]);
    return { count, list };
  }

  async insert(data: PurchaseOrderDTO) {
    console.log(data);
    return true;
  }
}
