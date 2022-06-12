import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { PurchaseProductDTO } from '@/dto/purchase-product.dto';

@ApiTags('供应产品')
@Controller('purchase/product')
export class ProductController {
  public constructor(private readonly ProductService: ProductService) {}

  @Get('list')
  getList() {
    return this.ProductService.getList();
  }

  @Post('/inert')
  insert(@Body() data: PurchaseProductDTO) {
    return this.ProductService.insert(data);
  }
}
