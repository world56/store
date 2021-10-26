import { Role } from '@/schema/system/role';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import type { TypeCommon } from '@/interface/common';
import type { TypeSchemaRole } from '@/schema/system/role';
import type { TypeSystemRole } from '@/interface/system/role';

@Injectable()
export class RoleService {
  public constructor(
    @InjectModel(Role.name)
    private readonly RoleModel: TypeSchemaRole,
  ) {}

  async getList(param: TypeSystemRole.ReqRoleList) {
    return await this.RoleModel.find(param);
  }

  async getDetails(params: TypeCommon.DatabaseMainParameter) {
    return await this.RoleModel.findById(params);
  }

  async add(data: TypeSystemRole.EditRoleParam) {
    return await this.RoleModel.create(data);
  }

  async remove(params: TypeCommon.DatabaseMainParameter) {
    return await this.RoleModel.findOneAndDelete(params);
  }

  async update(data: TypeSystemRole.EditRoleParam) {
    const { _id, ...params } = data;
    return await this.RoleModel.findByIdAndUpdate({ _id }, params);
  }
}
