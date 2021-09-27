import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as CONSTANT_USER from '@/constant/user';

import type { TypeDatabase } from '@/interface/db';
import type * as COMMON_TYPE from '@/interface/common';

export type TypeAdminUserSchema = TypeDatabase.TypeMongoose<AdminUser>;

/**
 * @name AdminUser 管理员账号
 * @description 管理系统-登录账号
 */
@Schema()
export class AdminUser {
  /**
   * @name account 账号
   */
  @Prop({ type: String, required: true })
  account: string;

  /**
   * @name password 密码
   */
  @Prop({ type: String, required: true })
  password: string;

  /**
   * @name name 用户名称
   */
  @Prop({ type: String, minlength: 2, maxlength: 4 })
  name: string;

  /**
   * @name phone 电话号码
   */
  @Prop({ type: String, minlength: 11, maxlength: 11 })
  phone: string;

  /**
   * @name createTime 注册时间
   */
  @Prop({ type: Date, default: new Date().getTime() })
  createTime: number;

  /**
   * @name is_super 是否超级管理员
   */
  @Prop({
    type: Number,
    enum: [CONSTANT_USER.ADMIN_USER.SUPER, CONSTANT_USER.ADMIN_USER.NOT_SUPER],
  })
  isSuper: COMMON_TYPE.ConstantVal<typeof CONSTANT_USER.ADMIN_USER>;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
