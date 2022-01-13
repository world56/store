import { Role as RoleModel } from './role';
import { Schema as MongooseSchema } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { ENUM_ADMIN } from '@/enum/admin';
import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '@/interface/common';

export type TypeSchemaAadminUser = TypeCommon.TypeMongoose<AdminUser>;

/**
 * @name AdminUser 管理员账号
 * @description 管理系统-登录账号
 */
@Schema({ versionKey: false })
export class AdminUser {
  @Prop({ type: String, required: true })
  account: string;

  @Prop({ type: String })
  password: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 4,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
  })
  phone: string;

  @Prop({
    type: Number,
    default: new Date().getTime(),
  })
  createTime: number;

  @Prop({
    type: Number,
    default: ENUM_COMMON.STATUS.ACTIVATE,
    enum: [ENUM_COMMON.STATUS.FREEZE, ENUM_COMMON.STATUS.ACTIVATE],
  })
  status: ENUM_COMMON.STATUS;

  @Prop({
    type: [{ ref: RoleModel.name, type: MongooseSchema.Types.ObjectId }],
  })
  role: RoleModel[] | string[];

  @Prop({
    type: Number,
    default: ENUM_ADMIN.ADMINISTRATOR.NOT_SUPER,
    enum: [ENUM_ADMIN.ADMINISTRATOR.NOT_SUPER, ENUM_ADMIN.ADMINISTRATOR.SUPER],
  })
  isSuper: ENUM_ADMIN.ADMINISTRATOR;

  @Prop({
    type: String,
  })
  remark?: string;
}

export const SchemaAdminUser = SchemaFactory.createForClass(AdminUser);
