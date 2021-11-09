import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from '@/schema/system/permission';

import type { TypeSchemaPermission } from '@/schema/system/permission';
import type { TypeSystemPermission } from '@/interface/system/permission';

@Injectable()
export class PermissionService {
  public constructor(
    @InjectModel(Permission.name)
    private readonly PermissionModel: TypeSchemaPermission,
  ) {}

  async examinePermissionvValidity() {}

  async getPermissionList(query: TypeSystemPermission.ReqPermissionList) {
    const { pageSize, currentPage, ...params } = query;
    const skip = (currentPage - 1) * pageSize;
    const total = await this.PermissionModel.find(params).count();
    const list = await this.PermissionModel.find(params)
      .limit(pageSize)
      .skip(skip);
    return { list, total, pageSize, currentPage };
  }

  async add(params: TypeSystemPermission.EditPermission) {
    return await this.PermissionModel.create(params);
  }
}
