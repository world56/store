import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { WarehousingService } from './warehousing.service';

@ApiTags('仓库入库')
@Controller('warehousing')
export class WarehousingController {
  constructor(private readonly WarehousingService: WarehousingService) {}

  @Get('list')
  getList() {
    return this.WarehousingService.getList();
  }
}
