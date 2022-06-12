import { ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ProductSpecDTO } from '@/dto/product-spec.dto';
import { SpecStatusChangeDTO } from './dto/spec-status.dto';
import { SpecQueryListDTO } from './dto/spec-query-list.dto';
import { SpecCategoryService } from './spec-category.service';
import { SpectCheckFieldsDTO } from './dto/spec-check-fields.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

@ApiTags('产品规格类目')
@Controller('purchase/spec/category')
export class SpecCategoryController {
  public constructor(
    private readonly SpecCategoryService: SpecCategoryService,
  ) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  getList(@Query() query: SpecQueryListDTO) {
    return this.SpecCategoryService.getList(query);
  }

  @Get('all')
  getAll(){
    return this.SpecCategoryService.getAll();
  }

  @Get('check')
  checkFields(@Query() query: SpectCheckFieldsDTO) {
    return this.SpecCategoryService.checkFields(query);
  }

  @Post('details')
  detailt(@Body() data: PrimaryKeyDTO) {
    return this.SpecCategoryService.details(data);
  }

  @Post('insert')
  insert(@Body() data: ProductSpecDTO) {
    return this.SpecCategoryService.insert(data);
  }

  @Post('update')
  update(@Body() data: ProductSpecDTO) {
    return this.SpecCategoryService.update(data);
  }

  @Post('status')
  changeStatus(@Body() data: SpecStatusChangeDTO) {
    return this.SpecCategoryService.changeStatus(data);
  }
}
