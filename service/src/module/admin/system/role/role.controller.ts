import { Controller, Get, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('admin/system/role')
export class RoleController {
  public constructor(private readonly RoleService: RoleService) {}

  @Get('list')
  async list(@Query() param) {
    console.log('@param', param);
    return this.RoleService.getList();
  }

  @Post('add')
  add() {
    return {};
  }
}
