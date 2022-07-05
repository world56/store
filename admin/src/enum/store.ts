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
   * @name CATEGORY 词典（存储在服务器）
   * @param SPEC 产品规格
   * @param ROLE 角色
   * @param DEPARTMENT 部门
   * @param ADMIN_USER 管理系统用户
   * @param PURCHASE_PRODUCT_TYPE 供应商类型
   * @param WAREHOUSE_POSITION 仓库仓位位置
   * @param WAREHOUSE_UNIT 库房计量单位
   * @param WAREHOUSE_PRODUCT_TYPE 仓库产品类型
   * @param PRODUCT_BRAND 产品品牌
   * @param PURCHASE_SUPPLIER 供应商
   * @param LOGISTSCS_COMPANY 物流公司
   */
  export enum CATEGORY {
    SPEC = "SPEC",
    ROLE = "ROLE",
    ADMIN_USER = "ADMIN_USER",
    DEPARTMENT = "DEPARTMENT",
    PURCHASE_PRODUCT_TYPE = "PURCHASE_PRODUCT_TYPE",
    WAREHOUSE_UNIT = "WAREHOUSE_UNIT",
    WAREHOUSE_POSITION = "WAREHOUSE_POSITION",
    WAREHOUSE_PRODUCT_TYPE = "WAREHOUSE_PRODUCT_TYPE",
    PRODUCT_BRAND = "PRODUCT_BRAND",
    PURCHASE_SUPPLIER = "PURCHASE_SUPPLIER",
    LOGISTSCS_COMPANY = "LOGISTSCS_COMPANY",
  }

  /**
   * @name CATEGORY_DEFAULT 词典 （本地）
   * @param STATUS 状态
   * @param FILE_TYPE 文件类型
   * @param SUPPLIER_LOG_TYPE 供应商日志类型
   * @param SUPPLIER_SHIPPING_METHOD 采购订单运输方式
   * @param SUPPLIER_SETTLEMENT 采购订单结算方式
   * @param SUPPLIER_ORDER_STATUS 采购订单状态
   * @param PERMISSION_TYPE 权限类型
   * @param WAREHOUSE_STATUS 仓位状态
   */
  export enum CATEGORY_DEFAULT {
    STATUS = "STATUS",
    FILE_TYPE = "FILE_TYPE",
    SUPPLIER_LOG_TYPE = "SUPPLIER_LOG_TYPE",
    SUPPLIER_SHIPPING_METHOD = "SUPPLIER_SHIPPING_METHOD",
    SUPPLIER_SETTLEMENT = "SUPPLIER_SETTLEMENT",
    SUPPLIER_ORDER_STATUS = "SUPPLIER_ORDER_STATUS",
    PERMISSION_TYPE = "PERMISSION_TYPE",
    WAREHOUSE_STATUS = "WAREHOUSE_STATUS",
  }
}
