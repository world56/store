import { TypeCommon } from "../common";
import { TypeSystemUser } from "../system/user";
import { TypeWarehouseWarehousing } from "./warehousing";

import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name TypeWarehousingAudit 入库单审核
 */
export namespace TypeWarehousingAudit {
  /**
   * @name DTO 仓储审核
   * @param type 审核类型 出库、入库、盘点
   * @param status 审核状态
   * @param auditTime 审核时间
   * @param createTime 创建时间
   * @param operatorId 最后操作人ID
   * @param operator 操作人信息
   * @param warehouseingId 入库ID
   * @param warehouseing 入库信息
   * @param remark 审核意见
   */
  export interface DTO<T = TypeCommon.PrimaryKey>
    extends Pick<TypeCommon.DTO, "id" | "createTime" | "remark"> {
    type: ENUM_WAREHOUSE.WAREHOUSING_TYPE;
    status: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_STATUS;
    auditTime?: Date;
    operatorId: T;
    warehouseingId: T;
    operator: TypeSystemUser.DTO;
    warehouseing: TypeWarehouseWarehousing.DTO;
  }

  /**
   * @name Query 查询审核列表
   */
  export interface Query
    extends Partial<Pick<TypeWarehouseWarehousing.DTO, "seq">>,
      Partial<
        Pick<DTO, "type" | "status" | "auditTime" | "createTime" | "operatorId">
      >,
      TypeCommon.PageTurning {}
}
