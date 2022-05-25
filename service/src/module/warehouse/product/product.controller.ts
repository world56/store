import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('产品出入库管理')
@Controller('warehouse/product')
export class ProductController {
  @Get('list')
  getList() {}
}
