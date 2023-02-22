import { PositionService } from './position.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { WarehousePositionDTO } from '@/dto/warehouse/position.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';
import { WarehousePositionQueryListDTO } from './dto/warehouse-position-list-query';

@ApiTags('仓储管理-仓位编排')
@Controller('warehouse/position')
export class PositionController {
  public constructor(private readonly PositionService: PositionService) {}

  @ApiOperation({ summary: '仓位列表' })
  @Get('list')
  getList(@Query() query: WarehousePositionQueryListDTO) {
    return this.PositionService.getList(query);
  }

  @ApiOperation({ summary: '获取所有仓位' })
  @Get('all')
  getAll() {
    return this.PositionService.getAll();
  }

  @ApiOperation({ summary: '获取仓位详情' })
  @Get('details')
  getDetails(@Query() query: PrimaryKeyDTO) {
    return this.PositionService.getDetails(query);
  }

  @ApiOperation({ summary: '新增仓位' })
  @Post('insert')
  insert(@Body() data: WarehousePositionDTO) {
    return this.PositionService.inseret(data);
  }

  @ApiOperation({ summary: '编辑仓位' })
  @Post('update')
  update(@Body() data: WarehousePositionDTO) {
    return this.PositionService.update(data);
  }

  @ApiOperation({ summary: '删除仓位' })
  @Post('remove')
  remove(@Body() body: PrimaryKeyDTO) {
    return this.PositionService.remove(body);
  }

  @ApiOperation({ summary: '仓位名称是否重复' })
  @Post('/check')
  checkFields(@Body() body: CheckFieldsIsRepeatDTO) {
    return this.PositionService.checkFields(body);
  }
}
