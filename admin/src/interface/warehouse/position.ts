import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "../common";
import type { TypeAdminUser } from "../system/user";

/**
 * @name TypeWarehousePosition 仓位编排
 */
export namespace TypeWarehousePosition {
  /**
   * @name DTO 仓位编排DTO
   * @param status 仓位状态
   * @param personId 负责人ID
   * @param person 责任人
   */
  export interface DTO extends Pick<TypeCommon.DTO, "id" | "name" | "remark"> {
    status: ENUM_WAREHOUSE.WAREHOUSE_STATUS;
    personId: number;
    person: Pick<TypeAdminUser.DTO, "name" | "phone">;
  }

  /**
   * @name Query 查询仓库、仓位列表
   */
  export interface Query extends Pick<DTO, "name">, TypeCommon.PageTurning {}
}
