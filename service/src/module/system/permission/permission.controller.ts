import { ApiTags } from '@nestjs/swagger';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { PermissionService } from './permission.service';
import { PermissionDTO } from '@/dto/system/permission.dto';
import { PermissionCheckRepeat } from './dto/permission-check-repeat';
import { PermissionQueryListDto } from './dto/permission-query-list.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';


@ApiTags('权限管理')
@Controller('system/permission')
export class PermissionController {
  constructor(private readonly PermissionService: PermissionService) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  getPermission(@Query() query: PermissionQueryListDto) {
    return this.PermissionService.getPermissionList(query);
  }

  @Get('details')
  getDetails(@Query() query: PrimaryKeyDTO) {
    return this.PermissionService.getDetails(query);
  }

  @Get('check')
  checkRepeat(@Query() query: PermissionCheckRepeat) {
    return this.PermissionService.checkRepeat(query);
  }

  @Post('insert')
  insert(@Body() body: PermissionDTO) {
    return this.PermissionService.insert(body);
  }

  @Post('update')
  update(@Body() body: PermissionDTO) {
    return this.PermissionService.update(body);
  }

  @Post('remove')
  delete(@Body() body: PrimaryKeyDTO) {
    return this.PermissionService.delete(body);
  }
}
