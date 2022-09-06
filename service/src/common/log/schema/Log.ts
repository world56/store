import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * @name Log 通用日志
 */
@Schema({ versionKey: false, _id: false })
export class Log extends Document {
  /**
   * @param id Primary Key
   */
  @Prop({
    type: SchemaTypes.ObjectId,
    unique: true,
    required: true,
    auto: true,
  })
  id: number;

  /**
   * @param creatorId 创建人ID
   */
  @Prop({
    type: Number,
    required: true,
  })
  creatorId: number;

  /**
   * @param category 日志类目
   */
  @Prop({
    type: String,
    required: true,
  })
  category: string;

  /**
   * @param type 日志类目
   */
  @Prop({
    type: String,
    required: true,
  })
  type: string;

  /**
   * @param title 日志标题
   */
  @Prop({
    type: String,
  })
  title: string;

  /**
   * @param content 日志内容
   */
  @Prop({
    type: String,
    required: true,
  })
  content: string;

  /**
   * @param relationId 关联id
   */
  @Prop({
    type: Number,
    required: true,
  })
  relationId: number;

  /**
   * @param createTime 创建时间
   */
  @Prop({
    type: Date,
    default: new Date(),
  })
  createTime: Date;
}

/**
 * @name LogSchema 操作日志
 */
export const LogSchema = SchemaFactory.createForClass(Log);
