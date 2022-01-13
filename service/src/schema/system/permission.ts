import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_SYSTEM } from '@/enum/system';

import type { TypeCommon } from '@/interface/common';

export type TypeSchemaPermission = TypeCommon.TypeMongoose<Permission>;

/**
 * @name Permission 权限
 * @description 管理系统-权限
 */
@Schema({ versionKey: false })
export class Permission {

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  code: string;

  @Prop({
    type: [String],
    default: [],
  })
  location: string[];

  @Prop({
    type: Number,
    required: true,
    enum: [
      ENUM_SYSTEM.PERMISSION_TYPE.PAGE,
      ENUM_SYSTEM.PERMISSION_TYPE.BUTTON,
      ENUM_SYSTEM.PERMISSION_TYPE.CONTENT,
    ],
    default: ENUM_SYSTEM.PERMISSION_TYPE.PAGE,
  })
  type: ENUM_SYSTEM.PERMISSION_TYPE;

  @Prop({
    type: Number,
    default: ENUM_COMMON.STATUS.ACTIVATE,
    enum: [ENUM_COMMON.STATUS.FREEZE, ENUM_COMMON.STATUS.ACTIVATE],
  })
  status: ENUM_COMMON.STATUS;

  @Prop({
    type: String,
  })
  remark: string;
}

export const SchemaPermission = SchemaFactory.createForClass(Permission);
