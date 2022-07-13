import { User } from '@/decorator/user';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';
import { PrimaryKeyStringDTO } from '@/dto/common/common.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { ConvertCurrencyUnitsPipe } from '@/pipe/convert-currency-units.pipe;';
import { PurchaseOrderQueryListDTO } from './dto/purchase-order-query-list.dto';

@ApiTags('采购订单')
@Controller('purchase/order')
export class OrderController {
  public constructor(private readonly OrderService: OrderService) {}

  @Get('list')
  @UsePipes(new QueryListPipe())
  getList(@Query() query: PurchaseOrderQueryListDTO) {
    return this.OrderService.getList(query);
  }

  @Post('details')
  details(@Body() body: PrimaryKeyStringDTO) {
    return this.OrderService.getDetails(body);
  }

  // @Get('logs')
  // getLogs(@Query() query: PrimaryKeyStringDTO) {
  //   return this.OrderService.getLogs(query);
  // }

  // @Post('log')
  // logistics(
  //   @Body() body: PurchaseOrderLogInsertDTO,
  //   @User() user: AdminUserDTO,
  // ) {
  //   return this.OrderService.updateLogistics(body, user);
  // }

  @Post('insert')
  insert(
    @Body(new ConvertCurrencyUnitsPipe(['products', 'unitPrice']))
    body: PurchaseOrderDTO,
    @User() user: AdminUserDTO,
  ) {
    return this.OrderService.insert(body, user);
  }

  @Post('update')
  update(
    @Body(new ConvertCurrencyUnitsPipe(['products', 'unitPrice']))
    body: PurchaseOrderDTO,
  ) {
    return this.OrderService.update(body);
  }
}
