import { PermissionService } from './permission.service';
// import { PageTurningPipe } from '@/pipe/page-turning.pipe';
import { QueryListFilterPipe } from '@/pipe/query-list-filter.pipe';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

import { DB_PRIMARY_KEY } from '@/config/db';

import type { TypeSystemPermission } from '@/interface/system/permission';

@Controller('admin/system/permission')
export class PermissionController {
  public constructor(private readonly PermissionService: PermissionService) {}

  @Get('check')
  checkTheRepeat(@Query() query: TypeSystemPermission.CheckFields) {
    return this.PermissionService.examinePermissionvValidity(query);
  }

  @Get('getDetails')
  getDetails(@Query(DB_PRIMARY_KEY) _id: string) {
    return this.PermissionService.getDetails(_id);
  }

  @UsePipes(new QueryListFilterPipe(['status']))
  @Get('list')
  getList(@Query() query: TypeSystemPermission.QueryList) {
    return this.PermissionService.getPermissionList(query);
  }

  @Get('/tree')
  createPermissionTree(@Query('tree') tree: boolean) {
    return this.PermissionService.getPermissionTree(tree);
  }

  @Post('add')
  add(@Body() body: TypeSystemPermission.Info) {
    return this.PermissionService.add(body);
  }

  @Post('update')
  update(@Body() body: TypeSystemPermission.Info) {
    return this.PermissionService.update(body);
  }

  @Post('remove')
  remove(@Body(DB_PRIMARY_KEY) _id: string) {
    return this.PermissionService.remove(_id);
  }
}
