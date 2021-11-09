import { Role } from '@/schema/system/role';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';

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
    const { pageSize, currentPage, ...otherParam } = param;
    const total = await this.RoleModel.find(otherParam).countDocuments();
    const list = await this.RoleModel.find(otherParam)
      .limit(pageSize)
      .skip((currentPage - 1) * pageSize);
    return { list, total, pageSize, currentPage };
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
    return await this.RoleModel.findByIdAndDelete({ _id });
  }

  async update(data: TypeSystemRole.EditRoleParam) {
    const { _id, ...params } = data;
    await this.fieldNameCheck({ _id, name: params.name });
    return await this.RoleModel.findByIdAndUpdate({ _id }, params);
  }

  async fieldNameCheck({ name, _id }: TypeSystemRole.ReqCheckRoleName) {
    const target = await this.RoleModel.findOne({ name });
    if (
      (target && name === target.name && _id === target?._id?.toString()) ||
      target === null
    ) {
      return true;
    }
    throw new HttpException('该角色名已被注册', HttpStatus.NOT_ACCEPTABLE);
  }
}
