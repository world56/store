import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';

@ApiTags('采购订单')
@Controller('purchase/order')
export class OrderController {
  public constructor(private readonly OrderService: OrderService) {}

  @Get('list')
  getList() {
    return this.OrderService.getList();
  }

  @Post('insert')
  insert(@Body() body: PurchaseOrderDTO) {
    return this.OrderService.insert(body);
  }
}
