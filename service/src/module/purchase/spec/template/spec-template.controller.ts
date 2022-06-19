import { ApiTags } from '@nestjs/swagger';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { ProductSpecDTO } from '@/dto/purchase/spec.dto';
import { SpecStatusChangeDTO } from './dto/spec-status.dto';
import { SpecQueryListDTO } from './dto/spec-query-list.dto';
import { SpecTemplateService } from './spec-template.service';
import { SpectCheckFieldsDTO } from './dto/spec-check-fields.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';


@ApiTags('产品规格类目')
@Controller('purchase/spec/template')
export class SpecTemplateController {
  public constructor(
    private readonly SpecTemplateService: SpecTemplateService,
  ) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  getList(@Query() query: SpecQueryListDTO) {
    return this.SpecTemplateService.getList(query);
  }

  @Get('all')
  getAll() {
    return this.SpecTemplateService.getAll();
  }

  @Get('check')
  checkFields(@Query() query: SpectCheckFieldsDTO) {
    return this.SpecTemplateService.checkFields(query);
  }

  @Post('details')
  detailt(@Body() data: PrimaryKeyDTO) {
    return this.SpecTemplateService.details(data);
  }

  @Post('insert')
  insert(@Body() data: ProductSpecDTO) {
    return this.SpecTemplateService.insert(data);
  }

  @Post('update')
  update(@Body() data: ProductSpecDTO) {
    return this.SpecTemplateService.update(data);
  }

  @Post('status')
  changeStatus(@Body() data: SpecStatusChangeDTO) {
    return this.SpecTemplateService.changeStatus(data);
  }
}
