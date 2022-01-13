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

  async examinePermissionvValidity(
    findParam: TypeSystemPermission.CheckFields,
  ) {
    const { _id, name, code } = findParam;
    const list = await this.PermissionModel.find({
      $or: [{ _id }, { code }, { name }],
    });
    const [target] = list;
    return Boolean(
      !target || (list.length === 1 && target?._id?.toString() === _id),
    );
  }

  async getDetails(_id: string) {
    return await this.PermissionModel.findOne({ _id });
  }

  private filterPermissionListToTree(list: Permission[], fKey?: string) {
    return list
      .filter((v) => {
        const [keys] = v.location.slice(-1);
        return keys === fKey;
      })
      .map((val) => {
        return {
          ...JSON.parse(JSON.stringify(val)),
          children: this.filterPermissionListToTree(list, val.code),
        };
      });
  }

  async getPermissionTree(tree: boolean) {
    const list = await this.PermissionModel.find();
    return tree ? this.filterPermissionListToTree(list) : list;
  }

  async getPermissionList(query: TypeSystemPermission.QueryList) {
    const { pageSize, pageSkip, currentPage, ...params } = query;
    const total = await this.PermissionModel.find(params).count();
    const list = await this.PermissionModel.find(params)
      .limit(pageSize)
      .skip(pageSkip);
    return { list, total, pageSize, currentPage };
  }

  async add(params: TypeSystemPermission.Info) {
    const { name, code } = params;
    await this.examinePermissionvValidity({ name, code });
    return await this.PermissionModel.create(params);
  }

  async update(body: TypeSystemPermission.Info) {
    const { _id, ...parameter } = body;
    await this.locationSort(body);
    await this.examinePermissionvValidity(body);
    return await this.PermissionModel.findByIdAndUpdate(_id, parameter);
  }

  private async locationSort(data: TypeSystemPermission.Info) {
    const { _id, code, location } = data;
    const changeLocStr = location?.toString();
    const editDoc = await this.PermissionModel.findById({ _id });
    if (editDoc?.location?.toString() !== changeLocStr) {
      const relevance = await this.PermissionModel.find({
        code: { $nin: [code] },
        location: { $in: [code] },
      });
      relevance?.forEach((v) => {
        v.location.splice(0, v.location.indexOf(code));
        v.location.unshift(...location);
        v.save();
      });
    }
    return;
  }

  async remove(_id: string) {
    return await this.PermissionModel.findByIdAndRemove(_id);
  }
}
