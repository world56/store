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
   * @name CATEGORY 词典类目（业务维护DB）
   * @desc src/api/ ENUM-API
   */
  export enum CATEGORY {
    /** @name SPEC 产品规格 */
    SPEC = "SPEC",

    /** @name ROLE 角色 */
    ROLE = "ROLE",

    /** @name ADMIN_USER 管理系统用户 */
    ADMIN_USER = "ADMIN_USER",

    /** @name DEPARTMENT 部门 */
    DEPARTMENT = "DEPARTMENT",

    /** @name PURCHASE_SUPPLIER 供应商 */
    PURCHASE_SUPPLIER = "PURCHASE_SUPPLIER",

    /** @name WAREHOUSE_POSITION 仓库仓位位置（用户自定义） */
    WAREHOUSE_POSITION = "WAREHOUSE_POSITION",

    /** @name PURCHASE_PRODUCT_TYPE 供应商类型（用户自定义） */
    PURCHASE_PRODUCT_TYPE = "PURCHASE_PRODUCT_TYPE",

    /** @name WAREHOUSE_UNIT 库房计量单位（用户自定义） */
    WAREHOUSE_UNIT = "WAREHOUSE_UNIT",

    /** @name WAREHOUSE_PRODUCT_TYPE 仓库产品类型（用户自定义） */
    WAREHOUSE_PRODUCT_TYPE = "WAREHOUSE_PRODUCT_TYPE",

    /** @name PRODUCT_BRAND 产品品牌（用户自定义） */
    PRODUCT_BRAND = "PRODUCT_BRAND",

    /** @name LOGISTSCS_COMPANY 物流公司（用户自定义） */
    LOGISTSCS_COMPANY = "LOGISTSCS_COMPANY",
  }

  /**
   * @name CATEGORY_DEFAULT 词典类目 （本地默认写死的）
   */
  export enum CATEGORY_DEFAULT {
    /** @name STATUS 基础状态（冻结、激活） */
    STATUS = "STATUS",

    /** @name FILE_TYPE 文件类型状态 */
    FILE_TYPE = "FILE_TYPE",

    /** @name PURCHASE_SHIPPING_METHOD 采购单运输方式 */
    PURCHASE_SHIPPING_METHOD = "PURCHASE_SHIPPING_METHOD",

    /** @name PURCHASE_SETTLEMENT_METHOD 采购订单结算方式 */
    PURCHASE_SETTLEMENT_METHOD = "PURCHASE_SETTLEMENT_METHOD",

    /** @name PERMISSION_TYPE 权限类型 */
    PERMISSION_TYPE = "PERMISSION_TYPE",

    /** @name WAREHOUSE_STATUS 仓位状态 */
    WAREHOUSE_STATUS = "WAREHOUSE_STATUS",
  }
}
