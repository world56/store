import { RoleService } from './role.service';
import { RoleDto } from '@/dto/system/role.dto';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { RuleQueryListDTO } from './dto/rule-query-list.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';

@ApiTags('角色管理')
@Controller('system/role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @ApiOperation({ summary: '系统角色列表' })
  @UsePipes(new QueryListPipe())
  @Get('list')
  getRoleList(@Query() query: RuleQueryListDTO) {
    return this.RoleService.getRoleList(query);
  }

  @ApiOperation({ summary: '获取系统所有角色' })
  @Get('all')
  getAllRole() {
    return this.RoleService.getAll();
  }

  @ApiOperation({ summary: '新增权限' })
  @Post('insert')
  insert(@Body() body: RoleDto) {
    return this.RoleService.insert(body);
  }

  @ApiOperation({ summary: '编辑权限' })
  @Post('update')
  update(@Body() body: RoleDto) {
    return this.RoleService.update(body);
  }

  @ApiOperation({ summary: '删除权限' })
  @Post('remove')
  remove(@Body() body: PrimaryKeyDTO) {
    return this.RoleService.remove(body);
  }

  @ApiOperation({ summary: '检查角色字段是否重复' })
  @Get('checkFields')
  checkField(@Query() query: CheckFieldsIsRepeatDTO) {
    return this.RoleService.checkField(query);
  }

  @ApiOperation({ summary: '获取权限详情' })
  @Get('details')
  getDetails(@Query() query: PrimaryKeyDTO) {
    return this.RoleService.getDetails(query);
  }
}
