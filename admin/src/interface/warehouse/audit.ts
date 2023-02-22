import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "../common";
import type { TypePurchaseOrder } from "../purchase/order";
import type { TypeAdminUser } from "@/interface/system/user";
import type { TypeWarehouseWarehousing } from "./warehousing";

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
   * @param warehousingId 入库ID
   * @param warehousing 入库信息
   * @param remark 审核意见
   */
  export interface DTO<T = TypeCommon.PrimaryKey>
    extends Pick<TypeCommon.DTO, "id" | "createTime" | "remark"> {
    type: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE;
    status: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS;
    auditTime?: Date;
    operatorId: T;
    warehousingId: T;
    operator: TypeAdminUser.DTO;
    warehousing: TypeWarehouseWarehousing.DTO;
  }

  /**
   * @name Query 查询审核列表
   */
  export interface Query
    extends Partial<Pick<TypeCommon.DTO, "no">>,
      Partial<
        Pick<DTO, "type" | "status" | "auditTime" | "createTime" | "operatorId">
      >,
      TypeCommon.PageTurning {}

  /**
   * @name QueryPurchaseOrderAudit 查询采购订单审核详情
   * @param warehousingOrderId 仓储入库单ID
   */
  export interface QueryPurchaseOrderAudit {
    warehousingOrderId: TypeWarehouseWarehousing.DTO["id"];
  }

  /**
   * @name PurchaseOrderAuditDetails 采购订单审核详情
   * @param order 订单详情
   */
  export interface PurchaseOrderAuditDetails
    extends Omit<TypeWarehouseWarehousing.DTO, "order"> {
    order: TypePurchaseOrder.DTO;
    audit: AuditBusiness;
  }

  /**
   * @name AuditBusiness 审核仓储业务
   */
  export interface AuditBusiness
    extends Pick<DTO, "status">,
      Pick<TypeCommon.DTO, "remark">,
      Pick<TypeWarehouseWarehousing.DTO, "id"> {}
}
