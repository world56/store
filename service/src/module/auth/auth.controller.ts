import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserToken } from '@/decorator/user-token.decorator';
import { AdminUserLoginDTO } from './dto/admin-user-login.dto';
import { ReqWhiteList } from '@/decorator/req-white-list.decorator';
import { AdminUserUpdatePwdDTO } from './dto/admin-user-update-pwd.dto';

@ApiTags('用户鉴权')
@Controller('auth')
export class UserController {
  public constructor(private readonly AuthService: AuthService) {}

  @Get('establish')
  @ReqWhiteList()
  getPubilcKey() {
    return this.AuthService.createKeys();
  }

  @ReqWhiteList()
  @Get('superAdminStatus')
  getSuperAdminStatus() {
    return this.AuthService.superAdminStatus();
  }

  @Post('register')
  @ReqWhiteList()
  register(@Body() body: AdminUserDTO) {
    return this.AuthService.register(body);
  }

  @Post('userInfo')
  userInfo(@UserToken() authorization: string) {
    return this.AuthService.getUserInfo(authorization);
  }

  @Post('login')
  @ReqWhiteList()
  login(@Body() body: AdminUserLoginDTO) {
    return this.AuthService.login(body);
  }

  @Post('updatePwd')
  updatePwd(@Body() body: AdminUserUpdatePwdDTO) {
    return this.AuthService.updateUserPwd(body);
  }
}
