import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemRole } from '@/interface/system/role';

export type TypeSchemaRole = TypeCommon.TypeMongoose<Role>;

/**
 * @name Role 角色
 * @description 管理系统-RBAC角色
 */
@Schema({ versionKey: false })
export class Role implements TypeSystemRole.EditRoleParam {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({
    type: Number,
    default: ENUM_COMMON.STATUS.ACTIVATE,
    enum: [ENUM_COMMON.STATUS.FREEZE, ENUM_COMMON.STATUS.ACTIVATE],
  })
  status: ENUM_COMMON.STATUS;

  @Prop({ type: Number, default: new Date().getTime() })
  createTime: number;
}

export const SchemaRole = SchemaFactory.createForClass(Role);
