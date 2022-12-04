import { AccountService } from './account.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FinanceAccountDTO } from '@/dto/finance/account';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
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
}
