import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminRole } from '@/schema/admin/system/role';

import type { TypeAdminRoleSchema } from '@/schema/admin/system/role';

@Injectable()
export class RoleService {
  public constructor(
    @InjectModel(AdminRole.name)
    private readonly RoleModel: TypeAdminRoleSchema,
  ) {}

  async getList() {
    return this.RoleModel.find();
  }
}
