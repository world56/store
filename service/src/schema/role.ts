import { ENUM_ADMIN_SYSTEM } from '@/enum/system';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import type { TypeDatabase } from '@/interface/db';

export type TypeAdminRoleSchema = TypeDatabase.TypeMongoose<AdminRole>;

/**
 * @name AdminRole 角色
 * @description 管理系统-RBAC角色
 */
@Schema()
export class AdminRole {
  /**
   * @name name 名称
   */
  @Prop({ type: String, required: true })
  name: string;

  /**
   * @name description 简介
   */
  @Prop({ type: String })
  description?: string;

  /**
   * @name status 当前状态
   * @description 默认激活
   */
  @Prop({
    type: Number,
    enum: [
      ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN,
      ENUM_ADMIN_SYSTEM.ROLE_STATUS.FREEZE,
    ],
  })
  status: ENUM_ADMIN_SYSTEM.ROLE_STATUS;

  /**
   * @name createTime 创建时间
   */
  @Prop({ type: Number, default: new Date().getTime() })
  createTime: number;
}

export const AdminRoleSchema = SchemaFactory.createForClass(AdminRole);
