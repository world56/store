import { User } from '@/decorator/user';
import { OrderService } from './order.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConvertCurrencyUnitsPipe } from '@/pipe/convert-currency-units.pipe';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { PurchaseOrderUpdateDTO } from './dto/pruchase-order-update.dto';
import { PurchaseOrderQueryListDTO } from './dto/purchase-order-query-list.dto';

@ApiTags('采购管理-采购订单')
@Controller('purchase/order')
export class OrderController {
  public constructor(private readonly OrderService: OrderService) {}

  @ApiOperation({ summary: '采购订单列表' })
  @Get('list')
  getList(
    @Query(new QueryListPipe(), new TimeFramePipe(['createTime']))
    query: PurchaseOrderQueryListDTO,
  ) {
    return this.OrderService.getList(query);
  }

  @ApiOperation({ summary: '获取采购订单详情' })
  @Post('details')
  details(@Body() body: PrimaryKeyDTO) {
    return this.OrderService.getDetails(body);
  }

  @ApiOperation({ summary: '新增采购订单' })
  @Post('insert')
  insert(
    @Body(new ConvertCurrencyUnitsPipe(['products', 'unitPrice']))
    body: PurchaseOrderUpdateDTO,
    @User() user: AdminUserDTO,
  ) {
    return this.OrderService.insert(body, user);
  }

  @ApiOperation({ summary: '编辑采购订单信息' })
  @Post('update')
  update(
    @Body(new ConvertCurrencyUnitsPipe(['products', 'unitPrice']))
    body: PurchaseOrderUpdateDTO,
  ) {
    return this.OrderService.update(body);
  }

  @ApiOperation({ summary: '终止采购流程' })
  @Post('termination')
  termination(@Body() body: PrimaryKeyDTO) {
    return this.OrderService.termination(body);
  }
}
