import { ENUM_COMMON } from "@/enum/common";
import type { TypeCommon } from "./common";

/**
 * @name TypeLog 日志模块
 */
export namespace TypeLog {
  /**
   * @name Log 日志
   * @param remark 日志内容
   * @param type 日志类型（状态）
   * @param creatorId 创建人ID
   * @param relationId 业务ID（订单号）
   * @param createTime 创建时间
   */
  export interface DTO<T = TypeCommon.PrimaryKey>
    extends Pick<TypeCommon.DTO, "remark"> {
    _id: string;
    type: number;
    creatorId: T;
    relationId: T;
    createTime: Date;
  }

  /**
   * @name Query 查询日志列表
   * @param status 状态
   */
  export interface Query extends Pick<DTO, "relationId" | "creatorId"> {
    status?: number;
    module: ENUM_COMMON.LOG_MODULE;
  }

  /**
   * @name Insert 新增日志记录
   */
  export interface Insert
    extends Omit<DTO, "type">,
      Pick<Query, "module"> {}
}
