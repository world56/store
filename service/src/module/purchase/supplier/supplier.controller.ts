import { SupplierService } from './supplier.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { PurchaseSupplierDTO } from '@/dto/purchase/supplier.dto';
import { SupplierAddFileDTO } from './dto/supplier-edit-file.dto';
import { SupplierQueryListDTO } from './dto/supplier-query-list.dto';
import { SupplierChangeStatusDTO } from './dto/supplier-change-status.dto';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';

@ApiTags('采购管理-供应商管理')
@Controller('purchase/supplier')
export class SupplierController {
  public constructor(private readonly SupplierService: SupplierService) {}

  @ApiOperation({ summary: '供应商列表' })
  @UsePipes(new QueryListPipe())
  @Get('list')
  list(@Query() query: SupplierQueryListDTO) {
    return this.SupplierService.getList(query);
  }

  @ApiOperation({ summary: '获取全部供应商' })
  @Get('all')
  getAll() {
    return this.SupplierService.getAll();
  }

  @ApiOperation({ summary: '获取供应商详情' })
  @Get('details')
  details(@Query() query: PrimaryKeyDTO) {
    return this.SupplierService.details(query);
  }

  @ApiOperation({ summary: '新增供应商' })
  @Post('insert')
  insert(@Body() data: PurchaseSupplierDTO) {
    return this.SupplierService.insert(data);
  }

  @ApiOperation({ summary: '编辑供应商' })
  @Post('update')
  update(@Body() data: PurchaseSupplierDTO) {
    return this.SupplierService.update(data);
  }

  @ApiOperation({
    summary: '冻结、激活供应商状态',
    description: '冻结后，无法在向该供应商发起采购订单',
  })
  @Post('status')
  changeStatus(@Body() data: SupplierChangeStatusDTO) {
    return this.SupplierService.changeStatus(data);
  }

  @ApiOperation({
    summary: '添加供应商附件',
    description: '例如营业执照等相关信息',
  })
  @Post('addFile')
  addFile(@Body() data: SupplierAddFileDTO) {
    return this.SupplierService.addFile(data);
  }

  @ApiOperation({ summary: '检查供应商字段是否存在重复' })
  @Get('check')
  checkFields(@Query() query: CheckFieldsIsRepeatDTO) {
    return this.SupplierService.check(query);
  }
}
