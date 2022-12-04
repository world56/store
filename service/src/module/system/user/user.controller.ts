import { UserService } from './user.service';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { AdminUserQuery } from './dto/admin-user-query.dto';
import { AdminUserUpdateDTO } from './dto/admin-user-update.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserCheckFilesDto } from './dto/admin-user-check-fields.dto';
import { AdminUserStatusChangeDto } from './dto/admin-user-status-change.dto';

@ApiTags('系统管理-系统用户')
@Controller('system/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @ApiOperation({ summary: '后台管理系统用户列表' })
  @Get('list')
  getUserList(
    @Query(new TimeFramePipe(['createTime']), new QueryListPipe())
    query: AdminUserQuery,
  ) {
    return this.UserService.getList(query);
  }

  @ApiOperation({ summary: '获取后台管理系统所有用户' })
  @Get('all')
  getAllUser() {
    return this.UserService.getAllAdminUserList();
  }

  @ApiOperation({ summary: '获取系统用户详情' })
  @Get('details')
  getuserInfo(@Query() query: PrimaryKeyDTO) {
    return this.UserService.getDetails(query);
  }

  @ApiOperation({ summary: '新增系统用户' })
  @Post('insert')
  insert(@Body() body: AdminUserDTO) {
    return this.UserService.insert(body);
  }

  @ApiOperation({ summary: '编辑用户信息' })
  @Post('update')
  update(@Body() body: AdminUserUpdateDTO) {
    return this.UserService.update(body);
  }

  @ApiOperation({ summary: '检测用户字段是否重复' })
  @Get('checkFields')
  checkFields(@Query() query: UserCheckFilesDto) {
    return this.UserService.checkFields(query);
  }

  @ApiOperation({
    summary: '冻结、解冻用户',
    description: '冻结后，该用户禁止登录、使用本系统',
  })
  @Post('freeze')
  freeze(@Body() body: AdminUserStatusChangeDto) {
    return this.UserService.freezeStatus(body);
  }

  @ApiOperation({ summary: '重制系统用户密码' })
  @Post('resetPassword')
  resetPassword(@Body() body: PrimaryKeyDTO) {
    return this.UserService.resetPassword(body);
  }
}
