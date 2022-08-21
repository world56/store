import { ApiTags } from '@nestjs/swagger';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { WarehousingService } from './warehousing.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WarehousingQueryList } from './dto/warehousing-query-list.dto';

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
}
