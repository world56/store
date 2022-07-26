import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { AdminUserQuery } from './dto/admin-user-query.dto';
import { AdminUserUpdateDTO } from './dto/admin-user-update.dto';
import { UserCheckFilesDto } from './dto/admin-user-check-fields.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { AdminUserStatusChangeDto } from './dto/admin-user-status-change.dto';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';

@ApiTags('后台系统用户')
@Controller('system/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('list')
  getUserList(
    @Query(new TimeFramePipe(['createTime']), new QueryListPipe())
    query: AdminUserQuery,
  ) {
    return this.UserService.getList(query);
  }

  @Get('all')
  getAllUser() {
    return this.UserService.getAllAdminUserList();
  }

  @Get('details')
  getuserInfo(@Query() query: PrimaryKeyDTO) {
    return this.UserService.getDetails(query);
  }

  @Get('checkFields')
  checkFields(@Query() query: UserCheckFilesDto) {
    return this.UserService.checkFields(query);
  }

  @Post('freeze')
  freeze(@Body() body: AdminUserStatusChangeDto) {
    return this.UserService.freezeStatus(body);
  }

  @Post('resetPassword')
  resetPassword(@Body() body: PrimaryKeyDTO) {
    return this.UserService.resetPassword(body);
  }

  @Post('insert')
  insert(@Body() body: AdminUserDTO) {
    return this.UserService.insert(body);
  }

  @Post('update')
  update(@Body() body: AdminUserUpdateDTO) {
    return this.UserService.update(body);
  }
}
