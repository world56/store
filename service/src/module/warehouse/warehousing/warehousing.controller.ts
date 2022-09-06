import { ApiTags } from '@nestjs/swagger';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { WarehousingService } from './warehousing.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WarehousingQueryList } from './dto/warehousing-query-list.dto';
import { ConfirmPurchaseWarehousingDTO } from './dto/confirm-purchase-warehousing.dto';
import { User } from '@/decorator/user';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

@ApiTags('仓库入库')
@Controller('warehouse/warehousing')
export class WarehousingController {
  public constructor(private readonly WarehousingService: WarehousingService) {}

  @Get('list')
  getList(
    @Query(new QueryListPipe(), new TimeFramePipe(['createTime', 'updateTime']))
    query: WarehousingQueryList,
  ) {
    return this.WarehousingService.getList(query);
  }

  @Post('details')
  getDetails(@Body() body: PrimaryKeyDTO) {
    return this.WarehousingService.getDetails(body);
  }

  @Post('receiving')
  receiving(@Body() body: PrimaryKeyDTO) {
    return this.WarehousingService.receiving(body);
  }

  @Post('void')
  toVoid(@Body() body: PrimaryKeyDTO) {
    return this.WarehousingService.toVoid(body);
  }

  @Post('confirm')
  confirmWarehousing(
    @Body() body: ConfirmPurchaseWarehousingDTO,
    @User() user: AdminUserDTO,
  ) {
    return this.WarehousingService.confirmWarehousing(body, user);
  }
}
