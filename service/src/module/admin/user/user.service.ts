import { Model } from 'mongoose';
import { AdminUser } from '@/schema/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(AdminUser.name)
    private readonly AdminUserSchema: Model<AdminUser>,
  ) {}

  async login() {
    return await this.AdminUserSchema.find();
  }
}
