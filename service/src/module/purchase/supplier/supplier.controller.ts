import { User } from '@/decorator/user';
import { ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { SupplierLogDTO } from './dto/supplier-log.dto';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { PurchaseSupplierDTO } from '@/dto/purchase/supplier.dto';
import { SupplierAddFileDTO } from './dto/supplier-edit-file.dto';
import { SupplierQueryListDTO } from './dto/supplier-query-list.dto';
import { SupplierQueryLogsDTO } from './dto/supplier-query-logs.dto';
import { SupplierCheckFieldsDTO } from './dto/supplier-check-fields.dto';
import { SupplierChangeStatusDTO } from './dto/supplier-change-status.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

@ApiTags('供应商管理')
@Controller('purchase/supplier')
export class SupplierController {
  public constructor(private readonly SupplierService: SupplierService) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  list(@Query() query: SupplierQueryListDTO) {
    return this.SupplierService.getList(query);
  }

  @Get('all')
  getAll() {
    return this.SupplierService.getAll();
  }

  @Get('logs')
  getLogs(@Query() query: SupplierQueryLogsDTO) {
    return this.SupplierService.getLogs(query);
  }

  @Post('addLog')
  addLog(@Body() data: SupplierLogDTO, @User() user: AdminUserDTO) {
    return this.SupplierService.addLog(data, user.id);
  }

  @Get('details')
  details(@Query() query: PrimaryKeyDTO) {
    return this.SupplierService.details(query);
  }

  @Post('status')
  changeStatus(
    @Body() data: SupplierChangeStatusDTO,
    @User() user: AdminUserDTO,
  ) {
    return this.SupplierService.changeStatus(data, user.id);
  }

  @Post('addFile')
  addFile(@Body() data: SupplierAddFileDTO) {
    return this.SupplierService.addFile(data);
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
