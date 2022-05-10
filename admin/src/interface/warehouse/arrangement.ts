import { ENUM_WAREHOUSE } from "@/enum/warehouse";
import { TypeCommon } from "../common";

/**
 * @name TypeWarehouseArrangement 仓位编排
 */
export namespace TypeWarehouseArrangement {
  /**
   * @name DTO 仓位编排DTO
   * @param status 仓位状态
   * @param personId 负责人ID
   */
  export interface DTO extends Pick<TypeCommon.DTO, "id" | "name" | "remark"> {
    status: ENUM_WAREHOUSE.STATUS;
    personId: number;
  }

  /**
   * @name QueryList 查询列表
   */
  export interface QueryList
    extends Pick<DTO, "name">,
      TypeCommon.PageTurning {}
}
