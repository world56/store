import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { SupplierProductDTO } from '@/dto/purchase/product.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SupplierProductQueryListDTO } from './dto/supplier-product-query-list.dto';
import { SupplierProductCheckFieldsDTO } from './dto/supplier-product-check-fields.dto';

@ApiTags('供应产品')
@Controller('purchase/product')
export class ProductController {
  public constructor(private readonly ProductService: ProductService) {}

  @Get('list')
  getList(@Query() query: SupplierProductQueryListDTO) {
    return this.ProductService.getList(query);
  }

  @Get('check')
  checkFields(@Query() query:SupplierProductCheckFieldsDTO){
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
