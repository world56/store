import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * @name Log 通用日志
 */
@Schema({ versionKey: false })
export class Log extends Document {
  /**
   * @param content 日志内容
   */
  @Prop({ type: String })
  remark: string;

  /**
   * @param type 日志类目（业务可细分）
   */
  @Prop({ type: Number })
  type: string;

  /**
   * @param creatorId 创建人ID
   */
  @Prop({ type: Number, required: true })
  creatorId: number;

  /**
   * @param relationId 关联id
   * @desc 一般指业务订单号ID
   */
  @Prop({ type: Number, required: true })
  relationId: number;

  /**
   * @param createTime 创建时间
   */
  @Prop({ type: Date, default: new Date() })
  createTime: Date;
}

/**
 * @name LogSchema 操作日志
 */
export const LogSchema = SchemaFactory.createForClass(Log);
