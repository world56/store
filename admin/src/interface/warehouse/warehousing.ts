import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "../common";
import type { TypeSpec } from "../purchase/spec";
import type { TypeAdminUser } from "../system/user";
import type { TypePurchaseOrder } from "../purchase/order";

/**
 * @name TypeWarehouseWarehousing 仓储-待入库
 */
export namespace TypeWarehouseWarehousing {
  /**
   * @name DTO 待入库
   * @param no 流水号
   * @param order 订单信息
   * @param orderId 订单ID (可能是采购、售后单)
   * @param inspectorId 清点人ID
   * @param consigneeId 收货人ID
   * @param type 订单ID 采购入库、售后入库
  //  * @param status 入库流程
   * @param createTime 创建时间
   * @param updateTime 操作时间
   * @param consignee 流程创建人
   * @param updateTime 清点入库人
   */
  export interface DTO<T = TypeCommon.PrimaryKey>
    extends TypeCommon.DatabaseMainParameter,
      Pick<TypeCommon.DTO, "remark"> {
    no: string;
    orderId: T;
    consigneeId: T;
    inspectorId: T;
    createTime: Date;
    updateTime?: Date;
    type: ENUM_WAREHOUSE.WAREHOUSING_TYPE;
    status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS;
    consignee: TypeAdminUser.DTO;
    inspector?: TypeAdminUser.DTO;
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
   * @param consigneeId 收货人ID
   * @param supplierId 供应商ID
   * @param createTime 创建时间
   * @param updateTime 入库时间
   */
  export interface Query
    extends TypeCommon.PageTurning,
      Partial<
        Pick<
          DTO,
          "type" | "createTime" | "updateTime" | "consigneeId" | "inspectorId"
        > &
          Pick<TypePurchaseOrder.DTO, "status"> &
          Pick<TypeCommon.DTO, "no">
      > {
    supplierId?: TypeCommon.PrimaryKey;
  }
}
