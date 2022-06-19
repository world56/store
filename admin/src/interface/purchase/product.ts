import type { TypeSpec } from "./spec";
import type { TypeCommon } from "../common";

/**
 * @name TypeSupplierProduct 采购管理-产品库
 */
export namespace TypeSupplierProduct {
  /**
   * @name Query 查询产品库列表
   * @param brandId 品牌ID
   * @param categoryId 类目ID
   * @param supplierId 供应商ID
   */
  export interface Query<T = TypeCommon.DatabaseMainParameter["id"]>
    extends Pick<DTO, "name" | "status">,
      TypeCommon.PageTurning {
    supplierId: T;
    brandId: T;
    categoryId: T;
  }

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
    spec: TypeSpec.SpecParameterDTO[];
  }

  /**
   * @name CheckFields 检查产品名称是否重复
   */
  export interface CheckFields extends Pick<TypeCommon.DTO, "id" | "name"> {}

  /**
   * @name EditDTO 编辑产品
   */
  export interface EditDTO
    extends Omit<
      DTO<TypeCommon.DatabaseMainParameter["id"]>,
      "spec" | "category" | "brand"
    > {
    category: TypeCommon.DatabaseMainParameter["id"][];
    spec: TypeCommon.DatabaseMainParameter["id"][];
  }
}
