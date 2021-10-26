import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { ENUM_ADMIN_SYSTEM } from '@/enum/system';

import type { TypeDatabase } from '@/interface/db';

export type TypeSchemaRole = TypeDatabase.TypeMongoose<Role>;

/**
 * @name Role 角色
 * @param name 角色名称
 * @param status 角色状态（默认激活）
 * @param createTime 创建时间
 * @param description 角色简介
 *
 * @description 管理系统-RBAC角色
 */
@Schema({ versionKey: false })
export class Role {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({
    type: Number,
    default: ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN,
    enum: [
      ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN,
      ENUM_ADMIN_SYSTEM.ROLE_STATUS.FREEZE,
    ],
  })
  status: ENUM_ADMIN_SYSTEM.ROLE_STATUS;

  @Prop({ type: Number, default: new Date().getTime() })
  createTime: number;
}

export const SchemaRole = SchemaFactory.createForClass(Role);
