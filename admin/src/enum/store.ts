/**
 * @name ENUM_STORE redux action
 */
export namespace ENUM_STORE {
  /**
   * @name ACTION_CATEGORY 获取category action
   */
  export enum ACTION_CATEGORY {
    QUERY = "QUERY",
    SET = "SET",
  }

  /**
   * @name CATEGORY 词典
   * @param ROLE 角色
   * @param DEPARTMENT 部门
   * @param ADMIN_USER 管理系统用户
   * @param PURCHASE_PRODUCT_TYPE 供应商类型
   * @param WAREHOUSE_POSITION 仓库仓位位置
   * @param WAREHOUSE_UNIT 库房计量单位
   * @param WAREHOUSE_PRODUCT_TYPE 仓库产品类型
   * @param PRODUCT_BRAND 产品品牌
   * @param PURCHASE_SUPPLIER 供应商
   * @param SPEC 产品规格
   */
  export enum CATEGORY {
    ROLE = "ROLE",
    ADMIN_USER = "ADMIN_USER",
    DEPARTMENT = "DEPARTMENT",
    PURCHASE_PRODUCT_TYPE = "PURCHASE_PRODUCT_TYPE",
    WAREHOUSE_UNIT = "WAREHOUSE_UNIT",
    WAREHOUSE_POSITION = "WAREHOUSE_POSITION",
    WAREHOUSE_PRODUCT_TYPE = "WAREHOUSE_PRODUCT_TYPE",
    PRODUCT_BRAND = "PRODUCT_BRAND",
    PURCHASE_SUPPLIER = "PURCHASE_SUPPLIER",
    SPEC = "SPEC",
  }
}
