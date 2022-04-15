import { RoleDto } from '@/dto/role.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { RuleQueryListDTO } from './dto/rule-query-list.dto';
import { RuleCheckFieldsDTO } from './dto/rule-check-fields.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

@ApiTags('角色管理')
@Controller('system/role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  getRoleList(@Query() query: RuleQueryListDTO) {
    return this.RoleService.getRoleList(query);
  }

  @Get('allRole')
  getAllRole() {
    return this.RoleService.getAll();
  }

  @Get('checkFields')
  checkField(@Query() query: RuleCheckFieldsDTO) {
    return this.RoleService.checkField(query);
  }

  @Get('details')
  getDetails(@Query() query: PrimaryKeyDTO) {
    return this.RoleService.getDetails(query);
  }

  @Post('insert')
  insert(@Body() body: RoleDto) {
    return this.RoleService.insert(body);
  }

  @Post('update')
  update(@Body() body: RoleDto) {
    return this.RoleService.update(body);
  }

  @Post('remove')
  remove(@Body() body: PrimaryKeyDTO) {
    return this.RoleService.remove(body);
  }
}
