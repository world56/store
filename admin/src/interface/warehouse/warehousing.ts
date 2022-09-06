import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "../common";
import type { TypeSystemUser } from "../system/user";
import type { TypePurchaseOrder } from "../purchase/order";
import { TypeSpec } from "../purchase/spec";

/**
 * @name TypeWarehouseWarehousing 仓储-待入库
 */
export namespace TypeWarehouseWarehousing {
  /**
   * @name DTO 待入库
   * @param seq 流水号
   * @param order 订单信息
   * @param orderId 订单ID (可能是采购、售后单)
   * @param inspectorId 操作人ID
   * @param type 订单ID 采购入库、售后入库
   * @param status 入库流程
   * @param createTime 创建时间
   * @param updateTime 操作时间
   * @param creator 流程创建人
   * @param updateTime 清点入库人
   */
  export interface DTO<T = TypeCommon.PrimaryKey>
    extends TypeCommon.DatabaseMainParameter,
      Pick<TypeCommon.DTO, "no" | "remark">,
      Record<"user" | "creator", TypeSystemUser.DTO> {
    orderId: T;
    creatorId: T;
    inspectorId: T;
    createTime: Date;
    updateTime?: Date;
    type: ENUM_WAREHOUSE.WAREHOUSING_TYPE;
    status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS;
    creator: TypeSystemUser.DTO;
    inspector?: TypeSystemUser.DTO;
    order: Omit<TypePurchaseOrder.DTO, "spec"> & {
      spec: TypeSpec.DTO;
    };
  }

  /**
   * @name ConfirmPurchaseWarehousing 确认采购入库产品信息
   */
  export interface ConfirmPurchaseWarehousing
    extends Pick<DTO, "id">,
      Pick<TypeCommon.DTO, "remark">,
      Pick<TypePurchaseOrder.DTO, "products"> {}

  /**
   * @name Query 查询待入库列表
   * @param seq 流水号
   * @param inspectorId 创建人ID
   * @param supplierId 供应商ID
   * @param createTime 创建时间
   * @param updateTime 入库时间
   */
  export interface Query
    extends TypeCommon.PageTurning,
      Partial<
        Pick<
          DTO,
          | "type"
          | "status"
          | "createTime"
          | "updateTime"
          | "creatorId"
          | "inspectorId"
        >
      > {
    supplierId?: TypeCommon.PrimaryKey;
  }
}
