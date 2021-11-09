import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PageTurningPipe } from '@/pipe/page-turning.pipe';

import type { TypeSystemPermission } from '@/interface/system/permission';

@Controller('admin/system/permission')
export class PermissionController {
  public constructor(private readonly PermissionService: PermissionService) {}

  @UsePipes(new PageTurningPipe())
  @Get('list')
  getList(@Query() query: TypeSystemPermission.ReqPermissionList) {
    return this.PermissionService.getPermissionList(query);
  }

  @Post('add')
  add(@Body() body: TypeSystemPermission.EditPermission) {
    return this.PermissionService.add(body);
  }
}
