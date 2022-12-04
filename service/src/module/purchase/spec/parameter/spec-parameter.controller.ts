import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SpecParameterService } from './spec-parameter.service';
import { SpecParameterEditDTO } from './dto/spec-parameter-edit.dto';
import { SpecParameterQueryDTO } from './dto/spec-parameter-query.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';
import { SpecParameterGetDetailsDTO } from './dto/spec-parameter-get-details.dto';
import { SpecParameterRelationCategoryDTO } from './dto/spec-parameter-relation-category.dto';

@ApiTags('采购管理-产品规格参数')
@Controller('purchase/spec/parameter')
export class SpecParameterController {
  public constructor(
    private readonly SpecParameterService: SpecParameterService,
  ) {}

  @ApiOperation({ summary: '产品规格参数列表' })
  @UsePipes(new QueryListPipe())
  @Get('list')
  getList(@Query() query: SpecParameterQueryDTO) {
    return this.SpecParameterService.getList(query);
  }

  @ApiOperation({ summary: '获取全部产品规格参数' })
  @Get('all')
  getAll() {
    return this.SpecParameterService.getAll();
  }

  @ApiOperation({ summary: '检查规格参数是否重复' })
  @Post('check')
  checkFields(@Body() body: CheckFieldsIsRepeatDTO) {
    return this.SpecParameterService.checkFields(body);
  }

  @ApiOperation({ summary: '获取规格参数详情' })
  @Get('details')
  details(@Query() query: SpecParameterGetDetailsDTO) {
    return this.SpecParameterService.detalis(query);
  }

  @ApiOperation({ summary: '新增产品规格' })
  @Post('inserts')
  inserts(@Body() data: SpecParameterEditDTO) {
    return this.SpecParameterService.inserts(data);
  }

  @ApiOperation({ summary: '编辑产品规格' })
  @Post('updates')
  updates(@Body() data: SpecParameterEditDTO) {
    return this.SpecParameterService.updates(data);
  }

  @ApiOperation({
    summary: '关联产品规格模板',
    description: '关联对应规格模板，可批量为产品添加规格。',
  })
  @Post('relation')
  relation(@Body() body: SpecParameterRelationCategoryDTO) {
    return this.SpecParameterService.relation(body);
  }
}
