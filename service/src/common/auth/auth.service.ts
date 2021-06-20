import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '@/module/user/user.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly JwtService: JwtService,
    private readonly UserService: UserService,
  ) {}

  async validate(account: string) {
    const user = await this.UserService.findUser(account);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  handerReqest(){
    console.log('@111')
  }

}
