import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArrangementService } from './arrangement.service';
import { ArrangementQueryListDTO } from './dto/arrangement-list-query';
import { WarehouseArrangementDTO } from '@/dto/warehouse-arrangement.dto';
import { PrimaryKeyDTO } from '@/dto/common.dto';

@ApiTags('库房仓位编排')
@Controller('warehouse/arrangement')
export class ArrangementController {
  public constructor(private readonly ArrangementService: ArrangementService) {}

  @Get('list')
  getList(@Query() query: ArrangementQueryListDTO) {
    return this.ArrangementService.getList(query);
  }

  @Get('details')
  getDetails(@Query() query:PrimaryKeyDTO) {
    return this.ArrangementService.getDetails(query);
  }

  @Post('insert')
  insert(@Body() data: WarehouseArrangementDTO) {
    return this.ArrangementService.inseret(data);
  }

  @Post('update')
  update(@Body() data: WarehouseArrangementDTO) {
    return this.ArrangementService.update(data);
  }

  @Post('remove')
  remove(@Body() body: PrimaryKeyDTO) {
    return this.ArrangementService.remove(body);
  }
}
