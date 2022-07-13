import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { SupplierProductDTO } from '@/dto/purchase/product.dto';
import { SupplierProductQuery } from './dto/supplier-product-query.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';
import { SupplierProductQueryListDTO } from './dto/supplier-product-query-list.dto';

@ApiTags('供应产品')
@Controller('purchase/product')
export class ProductController {
  public constructor(private readonly ProductService: ProductService) {}

  @Get('query')
  query(@Query() query: SupplierProductQuery) {
    return this.ProductService.query(query);
  }

  @Get('list')
  @UsePipes(new QueryListPipe())
  getList(@Query() query: SupplierProductQueryListDTO) {
    return this.ProductService.getList(query);
  }

  @Get('check')
  checkFields(@Query() query: CheckFieldsIsRepeatDTO) {
    return this.ProductService.checkFields(query);
  }

  @Get('details')
  details(@Query() query: PrimaryKeyDTO) {
    return this.ProductService.getDetails(query);
  }

  @Post('insert')
  insert(@Body() data: SupplierProductDTO) {
    return this.ProductService.insert(data);
  }

  @Post('update')
  update(@Body() data: SupplierProductDTO) {
    return this.ProductService.update(data);
  }
}
