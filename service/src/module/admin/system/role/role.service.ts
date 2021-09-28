import { AdminRole } from '@/schema/role';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import type { TypeAdminRoleSchema } from '@/schema/role';

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
