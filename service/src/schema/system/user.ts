import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as CONSTANT_USER from '@/constant/user';

import type { TypeDatabase } from '@/interface/db';
import type { TypeCommon } from '@/interface/common';

export type TypeSchemaAdministrator = TypeDatabase.TypeMongoose<Administrator>;

/**
 * @name Administrator 管理员账号
 * @param account 账号
 * @param password 密码
 * @param name 用户名称
 * @param phone 电话号码
 * @param createTime 注册时间
 * @param is_super 是否超级管理员（默认普通管理员）
 *
 * @description 管理系统-登录账号
 */
@Schema()
export class Administrator {
  @Prop({ type: String, required: true })
  account: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, minlength: 2, maxlength: 4 })
  name: string;

  @Prop({ type: String, minlength: 11, maxlength: 11 })
  phone: string;

  @Prop({ type: Date, default: new Date().getTime() })
  createTime: number;

  @Prop({
    type: Number,
    default: CONSTANT_USER.ADMIN_USER.NOT_SUPER,
    enum: [CONSTANT_USER.ADMIN_USER.SUPER, CONSTANT_USER.ADMIN_USER.NOT_SUPER],
  })
  isSuper: TypeCommon.ConstantVal<typeof CONSTANT_USER.ADMIN_USER>;
}

export const SchemaAdministrator = SchemaFactory.createForClass(Administrator);
