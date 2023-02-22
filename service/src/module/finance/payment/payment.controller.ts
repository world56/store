import { PaymentService } from './payment.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { PaymentQueryListDTO } from './dto/payment-query-list.dto';
import { PaymentConfirmDTO } from './dto/paymeny-confirm.dto';

@ApiTags('财务-应付款')
@Controller('finance/payment')
export class PaymentController {
  public constructor(private readonly PaymentService: PaymentService) {}

  @ApiOperation({ summary: '应付款列表' })
  @Get('list')
  getList(@Query(new QueryListPipe()) query: PaymentQueryListDTO) {
    return this.PaymentService.getList(query);
  }

  @ApiOperation({ summary: '确认付款' })
  @Post('confirm')
  confirm(@Body() body: PaymentConfirmDTO) {
    return this.PaymentService.confirm(body);
  }
}
