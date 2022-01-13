import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SecretService } from '@/common/secret/secret.service';
import { AdminUser as AdminUserModel } from '@/schema/system/user';

import { ENUM_ADMIN } from '@/enum/admin';
import { ADMIN_USER_DEFAULT_PW } from '@/config/secret';

import type { TypeSystemUser } from '@/interface/system/user';
import type { TypeSchemaAadminUser } from '@/schema/system/user';

@Injectable()
export class UserService {
  constructor(
    // @InjectModel(RoleModel.name)
    // private readonly RoleModel: TypeSchemaRole,
    private readonly SecretService: SecretService,
    @InjectModel(AdminUserModel.name)
    private readonly AdminUserModel: TypeSchemaAadminUser,
  ) {}

  async findUserList(query: Omit<TypeSystemUser.QueryList, 'role'>) {
    const { pageSize, currentPage, pageSkip, ...other } = query;
    const condition = {
      ...other,
      isSuper: { $in: [ENUM_ADMIN.ADMINISTRATOR.NOT_SUPER] },
    };
    console.log('@-findUserList', query);
    const total = await this.AdminUserModel.find(condition).countDocuments();
    const list = await this.AdminUserModel.find(condition, { isSuper: 0 })
      .skip(pageSkip)
      .limit(pageSize)
      .populate(['role']);
    return { list, total };
  }

  async getDetails(_id: string) {
    return await this.AdminUserModel.findById(
      { _id },
      { password: 0, isSuper: 0 },
    );
  }

  async add(data: TypeSystemUser.Info) {
    data.password = this.SecretService.md5(data.password);
    return await this.AdminUserModel.create(data);
  }

  async update(data: TypeSystemUser.Info) {
    const { _id, ...param } = data;
    await this.AdminUserModel.findByIdAndUpdate({ _id }, param);
  }

  async checkPepeat(data: Partial<TypeSystemUser.Info>) {
    const { account, name, phone, _id } = data;
    const list = await this.AdminUserModel.find({
      $or: [{ _id }, { name }, { phone }, { account }],
    });
    const [user] = list;
    return Boolean(
      !user || (list.length === 1 && user?._id?.toString() === _id),
    );
  }

  async freeze({ _id, status }: TypeSystemUser.FreezeStatusChange) {
    return await this.AdminUserModel.updateOne({ _id }, { $set: { status } });
  }

  async resetPassword(_id: string) {
    const password = this.SecretService.md5(ADMIN_USER_DEFAULT_PW);
    return this.AdminUserModel.updateOne({ _id }, { $set: { password } });
  }
}
