import { RoleService } from './role.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemRole } from '@/interface/system/role';

/**
 * @name RoleController 角色
 */
@Controller('admin/system/role')
export class RoleController {
  public constructor(private readonly RoleService: RoleService) {}

  @Get('list')
  list(@Query() param: TypeSystemRole.ReqRoleList) {
    return this.RoleService.getList(param);
  }

  @Get('details')
  details(@Query() params: TypeCommon.DatabaseMainParameter) {
    return this.RoleService.getDetails(params);
  }

  @Post('add')
  add(@Body() body: TypeSystemRole.EditRoleParam) {
    return this.RoleService.add(body);
  }

  @Get('remove')
  remove(@Query() params: TypeCommon.DatabaseMainParameter) {
    return this.RoleService.remove(params);
  }

  @Post('update')
  update(@Body() body: TypeSystemRole.EditRoleParam) {
    return this.RoleService.update(body);
  }
}
