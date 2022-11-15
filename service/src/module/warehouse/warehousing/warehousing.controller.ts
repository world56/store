import { User } from '@/decorator/user';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WarehousingService } from './warehousing.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { WarehousingQueryList } from './dto/warehousing-query-list.dto';
import { ConfirmPurchaseWarehousingDTO } from './dto/confirm-purchase-warehousing.dto';

@ApiTags('仓库产品入库')
@Controller('warehouse/warehousing')
export class WarehousingController {
  public constructor(private readonly WarehousingService: WarehousingService) {}

  @ApiOperation({ summary: '入库列表' })
  @Get('list')
  getList(
    @Query(new QueryListPipe(), new TimeFramePipe(['createTime', 'updateTime']))
    query: WarehousingQueryList,
  ) {
    return this.WarehousingService.getList(query);
  }

  @ApiOperation({ summary: '获取入库详情' })
  @Post('details')
  getDetails(@Body() body: PrimaryKeyDTO) {
    return this.WarehousingService.getDetails(body);
  }

  @ApiOperation({ summary: '确认收货' })
  @Post('receiving')
  receiving(@Body() body: PrimaryKeyDTO, @User() user: AdminUserDTO) {
    return this.WarehousingService.receiving(body, user);
  }

  @ApiOperation({ summary: '确认清点产品入库' })
  @Post('confirm')
  confirmWarehousing(
    @Body() body: ConfirmPurchaseWarehousingDTO,
    @User() user: AdminUserDTO,
  ) {
    return this.WarehousingService.confirmWarehousing(body, user);
  }
}
