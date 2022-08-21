import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "../common";
import { TypeSystemUser } from "../system/user";

/**
 * @name TypeWarehouseWarehousing 仓储-待入库
 */
export namespace TypeWarehouseWarehousing {
  /**
   * @name DTO 待入库
   * @param seq 流水号
   * @param orderId 订单ID (可能是采购、售后单)
   * @param inspectorId 操作人ID
   * @param type 订单ID 采购入库、售后入库
   * @param status 入库流程
   * @param createTime 创建时间
   * @param updateTime 操作时间
   * @param creator 流程创建人
   * @param updateTime 清点入库人
   */
  export interface DTO<T = TypeCommon.DatabaseMainParameter["id"]>
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
  }

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
    supplierId?: TypeCommon.DatabaseMainParameter["id"];
  }
}
