import { ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { PositionService } from './position.service';
import { WarehousePositionDTO } from '@/dto/warehouse-position.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WarehousePositionQueryListDTO } from './dto/warehouse-position-list-query';

@ApiTags('库房仓位编排')
@Controller('warehouse/position')
export class PositionController {
  public constructor(private readonly PositionService: PositionService) {}

  @Get('list')
  getList(@Query() query: WarehousePositionQueryListDTO) {
    return this.PositionService.getList(query);
  }

  @Get('all')
  getAll(){
    return this.PositionService.getAll();
  }

  @Get('details')
  getDetails(@Query() query: PrimaryKeyDTO) {
    return this.PositionService.getDetails(query);
  }

  @Post('insert')
  insert(@Body() data: WarehousePositionDTO) {
    return this.PositionService.inseret(data);
  }

  @Post('update')
  update(@Body() data: WarehousePositionDTO) {
    return this.PositionService.update(data);
  }

  @Post('remove')
  remove(@Body() body: PrimaryKeyDTO) {
    return this.PositionService.remove(body);
  }
}


