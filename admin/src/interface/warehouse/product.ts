import { TypeCommon } from "../common";

/**
 * @name TypeWarehouseProduct 仓库产品出入库管理
 */
export namespace TypeWarehouseProduct {
  /**
   * @name DTO 仓位产品DTO
   * @param count 产品总数
   * @param positionId 存储仓位
   * @param alertQuantity 产品警戒数（可能需要补货、下架）
   * @param createTime 入仓时间
   * @param updateTime 更新时间
   * @param files 附件
   */
  export interface DTO extends Pick<TypeCommon.DTO, "id" | "name" | "remark"> {
    positionId: number;
    count: number;
    alertQuantity: number;
    createTime: Date;
    updateTime: Date;
    files?: TypeCommon.File[];
  }

  /**
   * @name Query 查询产品列表
   */
  export interface Query extends TypeCommon.PageTurning {}
}
