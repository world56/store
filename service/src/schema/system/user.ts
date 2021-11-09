import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { ENUM_ADMIN } from '@/enum/admin';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemUser } from '@/interface/system/user';

export type TypeSchemaAdministratorUser =
  TypeCommon.TypeMongoose<AdministratorUser>;

/**
 * @name AdministratorUser 管理员账号
 * @description 管理系统-登录账号
 */
@Schema({ versionKey: false })
export class AdministratorUser implements TypeSystemUser.UserInfo {
  @Prop({ type: String, required: true })
  account: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, minlength: 2, maxlength: 4 })
  name: string;

  @Prop({ type: Number, minlength: 11, maxlength: 11 })
  phone: number;

  @Prop({ type: Number, default: new Date().getTime() })
  createTime: number;

  @Prop({
    type: Number,
    default: ENUM_ADMIN.ADMINISTRATOR.NOT_SUPER,
    enum: [ENUM_ADMIN.ADMINISTRATOR.NOT_SUPER, ENUM_ADMIN.ADMINISTRATOR.SUPER],
  })
  isSuper: ENUM_ADMIN.ADMINISTRATOR;
}

export const SchemaAdministratorUser =
  SchemaFactory.createForClass(AdministratorUser);
