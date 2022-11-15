import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { PermissionService } from './permission.service';
import { PermissionDTO } from '@/dto/system/permission.dto';
import { PermissionCheckRepeat } from './dto/permission-check-repeat';
import { PermissionQueryListDto } from './dto/permission-query-list.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

@ApiTags('系统权限')
@Controller('system/permission')
export class PermissionController {
  constructor(private readonly PermissionService: PermissionService) {}

  @ApiOperation({ summary: '权限列表' })
  @UsePipes(new QueryListPipe())
  @Get('list')
  getPermission(@Query() query: PermissionQueryListDto) {
    return this.PermissionService.getPermissionList(query);
  }

  @ApiOperation({ summary: '获取权限详情' })
  @Get('details')
  getDetails(@Query() query: PrimaryKeyDTO) {
    return this.PermissionService.getDetails(query);
  }

  @ApiOperation({ summary: '新增权限' })
  @Post('insert')
  insert(@Body() body: PermissionDTO) {
    return this.PermissionService.insert(body);
  }

  @ApiOperation({ summary: '编辑权限信息' })
  @Post('update')
  update(@Body() body: PermissionDTO) {
    return this.PermissionService.update(body);
  }

  @ApiOperation({ summary: '删除权限' })
  @Post('remove')
  delete(@Body() body: PrimaryKeyDTO) {
    return this.PermissionService.delete(body);
  }

  @ApiOperation({ summary: '检查权限字段是否重复' })
  @Get('check')
  checkRepeat(@Query() query: PermissionCheckRepeat) {
    return this.PermissionService.checkRepeat(query);
  }
}
