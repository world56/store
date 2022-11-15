import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { ProductSpecDTO } from '@/dto/purchase/spec.dto';
import { SpecStatusChangeDTO } from './dto/spec-status.dto';
import { SpecQueryListDTO } from './dto/spec-query-list.dto';
import { SpecTemplateService } from './spec-template.service';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';

@ApiTags('产品规格模板')
@Controller('purchase/spec/template')
export class SpecTemplateController {
  public constructor(
    private readonly SpecTemplateService: SpecTemplateService,
  ) {}

  @ApiOperation({ summary: '产品规格模板列表' })
  @UsePipes(new QueryListPipe())
  @Get('list')
  getList(@Query() query: SpecQueryListDTO) {
    return this.SpecTemplateService.getList(query);
  }

  @ApiOperation({ summary: '获取所有产品规格模板' })
  @Get('all')
  getAll() {
    return this.SpecTemplateService.getAll();
  }

  @ApiOperation({ summary: '获取产品规格模板详情' })
  @Post('details')
  detailt(@Body() data: PrimaryKeyDTO) {
    return this.SpecTemplateService.details(data);
  }

  @ApiOperation({ summary: '新增产品规格模板' })
  @Post('insert')
  insert(@Body() data: ProductSpecDTO) {
    return this.SpecTemplateService.insert(data);
  }

  @ApiOperation({ summary: '编辑产品规格模板信息' })
  @Post('update')
  update(@Body() data: ProductSpecDTO) {
    return this.SpecTemplateService.update(data);
  }

  @ApiOperation({ summary: '检查产品规格模板字段是否重复' })
  @Get('check')
  checkFields(@Query() query: CheckFieldsIsRepeatDTO) {
    return this.SpecTemplateService.checkFields(query);
  }

  @ApiOperation({
    summary: '冻结、激活产品规格模板状态',
    description: '冻结后无法将无法使用该规格模板',
  })
  @Post('status')
  changeStatus(@Body() data: SpecStatusChangeDTO) {
    return this.SpecTemplateService.changeStatus(data);
  }
}
