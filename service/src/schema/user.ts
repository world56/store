import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as CONSTANT_USER from '@/constant/user';

import type * as COMMON_TYPE from '@/interface/common';

@Schema()
export class AdminUser {
  @Prop({ type: String, required: true })
  account: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, minlength: 4, maxlength: 2 })
  name: string;

  @Prop({ type: String, minlength: 11, maxlength: 11 })
  phone: string;

  @Prop({ type: Date, default: new Date().valueOf() })
  ctime: number;

  @Prop({ type: Number, enum: Object.values(CONSTANT_USER.ADMIN_USER) })
  is_super: COMMON_TYPE.ConstantVal<typeof CONSTANT_USER.ADMIN_USER>;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
