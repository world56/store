import { RoleService } from './role.service';
import { EditRolePipe } from './pipe/edit-role.pipe';
import { PageTurningPipe } from '@/pipe/page-turning.pipe';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemRole } from '@/interface/system/role';

/**
 * @name RoleController 角色
 */
@Controller('admin/system/role')
export class RoleController {
  public constructor(private readonly RoleService: RoleService) {}

  @Get('list')
  @UsePipes(new PageTurningPipe())
  list(@Query() param: TypeSystemRole.ReqRoleList) {
    return this.RoleService.getList(param);
  }

  @Get('details')
  details(@Query() params: TypeCommon.DatabaseMainParameter) {
    return this.RoleService.getDetails(params);
  }

  @Post('add')
  @UsePipes(new EditRolePipe())
  add(@Body() body: TypeSystemRole.EditRoleParam) {
    return this.RoleService.add(body);
  }

  @Post('update')
  @UsePipes(new EditRolePipe())
  update(@Body() body: TypeSystemRole.EditRoleParam) {
    return this.RoleService.update(body);
  }

  @Get('remove')
  remove(@Query() params: TypeCommon.DatabaseMainParameter) {
    return this.RoleService.remove(params);
  }

  @Get('fieldCheck')
  fieldNameCheck(@Query() param: TypeSystemRole.ReqCheckRoleName) {
    return this.RoleService.fieldNameCheck(param);
  }
}
