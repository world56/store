import type { TypeCommon } from "../common";

/**
 * @name TypePurchaseProduct 采购管理-产品库
 */
export namespace TypePurchaseProduct {
  /**
   * @name Query 查询产品库列表
   */
  export interface Query extends Pick<DTO, "name">, TypeCommon.PageTurning {}

  /**
   * @name DTO 产品库DTO
   * @param brandId 品牌id
   * @param brand 品牌
   * @param category 产品类目
   * @param pictures 产品图片
   */
  export interface DTO<T = TypeCommon.Category>
    extends Pick<
      TypeCommon.DTO,
      "id" | "name" | "category" | "status" | "remark"
    > {
    supplier: T[];
    pictures: TypeCommon.File[];
    brand: T;
    brandId: number;
    unit: T;
  }

  /**
   * @name EditDTO 编辑产品
   */
  export interface EditDTO extends Omit<DTO<number>, "brand"> {}
}
