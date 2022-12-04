import { ProductService } from './product.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { SupplierProductDTO } from '@/dto/purchase/product.dto';
import { SupplierProductQuery } from './dto/supplier-product-query.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';
import { SupplierProductQueryListDTO } from './dto/supplier-product-query-list.dto';

@ApiTags('采购管理-供应产品')
@Controller('purchase/product')
export class ProductController {
  public constructor(private readonly ProductService: ProductService) {}

  @ApiOperation({ summary: '产品列表' })
  @Get('list')
  @UsePipes(new QueryListPipe())
  getList(@Query() query: SupplierProductQueryListDTO) {
    return this.ProductService.getList(query);
  }

  @ApiOperation({ summary: '查询供应商旗下产品' })
  @Get('query')
  query(@Query() query: SupplierProductQuery) {
    return this.ProductService.query(query);
  }

  @ApiOperation({ summary: '获取产品详情' })
  @Get('details')
  details(@Query() query: PrimaryKeyDTO) {
    return this.ProductService.getDetails(query);
  }

  @ApiOperation({ summary: '新增产品' })
  @Post('insert')
  insert(@Body() data: SupplierProductDTO) {
    return this.ProductService.insert(data);
  }

  @ApiOperation({ summary: '编辑产品信息' })
  @Post('update')
  update(@Body() data: SupplierProductDTO) {
    return this.ProductService.update(data);
  }

  @ApiOperation({ summary: '检查产品字段是否存在重复' })
  @Get('check')
  checkFields(@Query() query: CheckFieldsIsRepeatDTO) {
    return this.ProductService.checkFields(query);
  }
}
