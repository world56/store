import { ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { SupplierService } from './supplier.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { SupplierQueryListDTO } from './dto/supplier-query-list.dto';
import { PurchaseSupplierDTO } from '@/dto/purchase-supplier.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { SupplierCheckFieldsDTO } from './dto/supplier-check-fields.dto';

@ApiTags('供应商管理')
@Controller('purchase/supplier')
export class SupplierController {
  public constructor(private readonly SupplierService: SupplierService) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  list(@Query() query: SupplierQueryListDTO) {
    return this.SupplierService.getList(query);
  }

  @Get('details')
  details(@Query() query: PrimaryKeyDTO) {
    return this.SupplierService.details(query);
  }

  @Get('check')
  checkFields(@Query() query: SupplierCheckFieldsDTO) {
    return this.SupplierService.check(query);
  }

  @Post('insert')
  insert(@Body() data: PurchaseSupplierDTO) {
    return this.SupplierService.insert(data);
  }

  @Post('update')
  update(@Body() data: PurchaseSupplierDTO) {
    return this.SupplierService.update(data);
  }
}
