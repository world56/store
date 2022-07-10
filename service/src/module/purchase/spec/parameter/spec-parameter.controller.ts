import { ApiTags } from '@nestjs/swagger';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { SpecParameterService } from './spec-parameter.service';
import { SpecParameterEditDTO } from './dto/spec-parameter-edit.dto';
import { SpecParameterQueryDTO } from './dto/spec-parameter-query.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';
import { SpecParameterGetDetailsDTO } from './dto/spec-parameter-get-details.dto';
import { SpecParameterRelationCategoryDTO } from './dto/spec-parameter-relation-category.dto';

@ApiTags('产品规格参数')
@Controller('purchase/spec/parameter')
export class SpecParameterController {
  public constructor(
    private readonly SpecParameterService: SpecParameterService,
  ) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  getList(@Query() query: SpecParameterQueryDTO) {
    return this.SpecParameterService.getList(query);
  }

  @Get('all')
  getAll(){
    return this.SpecParameterService.getAll();
  }

  @Post('check')
  checkFields(@Body() body: CheckFieldsIsRepeatDTO) {
    return this.SpecParameterService.checkFields(body);
  }

  @Get('details')
  details(@Query() query: SpecParameterGetDetailsDTO) {
    return this.SpecParameterService.detalis(query);
  }

  @Post('inserts')
  inserts(@Body() data: SpecParameterEditDTO) {
    return this.SpecParameterService.inserts(data);
  }

  @Post('updates')
  updates(@Body() data: SpecParameterEditDTO) {
    return this.SpecParameterService.updates(data);
  }

  @Post('relation')
  relation(@Body() body: SpecParameterRelationCategoryDTO) {
    return this.SpecParameterService.relation(body);
  }
}
