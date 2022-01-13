import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role as RoleModel } from '@/schema/system/role';
import { AdminUser as AdminUserModel } from '@/schema/system/user';

import type { TypeCommon } from '@/interface/common';
import type { TypeSchemaRole } from '@/schema/system/role';
import type { TypeSystemRole } from '@/interface/system/role';
import type { TypeSchemaAadminUser } from '@/schema/system/user';

@Injectable()
export class RoleService {
  public constructor(
    @InjectModel(RoleModel.name)
    private readonly RoleModel: TypeSchemaRole,
    @InjectModel(AdminUserModel.name)
    private readonly AdminUserModel: TypeSchemaAadminUser,
  ) {}

  async getList(param: TypeSystemRole.ReqRoleList) {
    const { pageSize, currentPage, pageSkip, ...otherParam } = param;
    const total = await this.RoleModel.find(otherParam).countDocuments();
    const list = await this.RoleModel.find(otherParam)
      .limit(pageSize)
      .skip(pageSkip);
    return { list, total, pageSize, currentPage };
  }

  async getAllRoleList() {
    return await this.RoleModel.find();
  }

  async getDetails(params: TypeCommon.DatabaseMainParameter) {
    return await this.RoleModel.findById(params);
  }

  async add(data: TypeSystemRole.EditRoleParam) {
    const { name } = data;
    await this.fieldNameCheck({ name });
    return await this.RoleModel.create(data);
  }

  async remove({ _id }: TypeCommon.DatabaseMainParameter) {
    await this.AdminUserModel.updateMany(
      { role: { $in: [_id] } },
      { $pull: { role: _id } },
    );
    return await this.RoleModel.findByIdAndDelete({ _id });
  }

  async update(data: TypeSystemRole.EditRoleParam) {
    const { _id, ...params } = data;
    await this.fieldNameCheck({ _id, name: params.name });
    return await this.RoleModel.findByIdAndUpdate({ _id }, params);
  }

  async fieldNameCheck({ name, _id }: TypeSystemRole.ReqCheckRoleName) {
    const target = await this.RoleModel.findOne({ name });
    return Boolean(
      !target ||
        (target && name === target.name && _id === target?._id?.toString()),
    );
  }
}
