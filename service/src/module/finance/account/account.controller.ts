import {
  Get,
  Post,
  Body,
  Query,
  Param,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { FinanceAccountDTO } from '@/dto/finance/account';
import { FinanceAccountQueryListDTO } from './dto/finance-account-query-list.dto';

@ApiTags('财务-供应商付款账户管理')
@Controller('finance/account')
export class AccountController {
  public constructor(private readonly AccountService: AccountService) {}

  @ApiOperation({ summary: '获取所有供应商付款账户' })
  @Get('list')
  getList(@Query(new QueryListPipe()) query: FinanceAccountQueryListDTO) {
    return this.AccountService.getList(query);
  }

  @ApiOperation({ summary: '获取收款账户详情' })
  @Get('details')
  getDetails(@Query() params: PrimaryKeyDTO) {
    return this.AccountService.getDetails(params);
  }

  @ApiOperation({ summary: '新增供应商付款账户' })
  @Post('insert')
  insert(@Body() body: FinanceAccountDTO) {
    return this.AccountService.insert(body);
  }

  @ApiOperation({ summary: '更新供应商付款账户信息' })
  @Post('update')
  update(@Body() body: FinanceAccountDTO) {
    return this.AccountService.update(body);
  }

  @ApiOperation({
    summary: '激活、冻结付款庄户状态',
    description: '冻结后不能选择该账户进行登记付款记录',
  })
  @Post('status/:id')
  changeStatus(
    @Param('id', new ParseIntPipe()) id: number,
    @Body('status', new ParseIntPipe()) status: number,
  ) {
    return this.AccountService.changeStatus(id, status);
  }
}
