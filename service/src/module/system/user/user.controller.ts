import { UserService } from './user.service';
// import { QueryPrimaryKeyPipe } from '@/pipe/query-primary-key.pipe';
import { QueryListFilterPipe } from '@/pipe/query-list-filter.pipe';
import { QueryTimeHorizonPipe } from '@/pipe/query-time-horizon.pipe';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

import { DB_PRIMARY_KEY } from '@/config/db';

import type { TypeSystemUser } from '@/interface/system/user';

@Controller('admin/system/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('list')
  @UsePipes(
    new QueryListFilterPipe(['status']),
    new QueryTimeHorizonPipe('createTime'),
  )
  list(@Query() query: TypeSystemUser.QueryList) {
    return this.UserService.findUserList(query);
  }

  @Post('add')
  add(@Body() data: TypeSystemUser.Info) {
    return this.UserService.add(data);
  }

  @Get('details')
  details(@Query(DB_PRIMARY_KEY) id: string) {
    return this.UserService.getDetails(id);
  }

  @Get('checkField')
  checkFields(@Query() data: Partial<TypeSystemUser.Info>) {
    return this.UserService.checkPepeat(data);
  }

  @Post('update')
  update(@Body() data: TypeSystemUser.Info) {
    return this.UserService.update(data);
  }

  @Post('freeze')
  freeze(@Body() data: TypeSystemUser.FreezeStatusChange) {
    return this.UserService.freeze(data);
  }

  @Post('resetPassword')
  resetPassword(@Body(DB_PRIMARY_KEY) id: string) {
    return this.UserService.resetPassword(id);
  }
}
