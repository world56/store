import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: '获取密钥' })
  @Get('establish')
  @ReqWhiteList()
  getPublicKey() {
    return this.AuthService.createKeys();
  }

  @ApiOperation({ summary: '是否存在超级管理员' })
  @ReqWhiteList()
  @Get('superAdminStatus')
  getSuperAdminStatus() {
    return this.AuthService.superAdminStatus();
  }

  @ApiOperation({ summary: '注册超级管理员' })
  @Post('register')
  @ReqWhiteList()
  register(@Body() body: AdminUserDTO) {
    return this.AuthService.register(body);
  }

  @ApiOperation({ summary: '获取用户详情' })
  @Post('userInfo')
  userInfo(@UserToken() authorization: string) {
    return this.AuthService.getUserInfo(authorization);
  }

  @ApiOperation({ summary: '登录' })
  @Post('login')
  @ReqWhiteList()
  login(@Body() body: AdminUserLoginDTO) {
    return this.AuthService.login(body);
  }

  @ApiOperation({ summary: '修改用户密码' })
  @Post('updatePwd')
  updatePwd(@Body() body: AdminUserUpdatePwdDTO) {
    return this.AuthService.updateUserPwd(body);
  }
}
