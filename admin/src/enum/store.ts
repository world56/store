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

    /** @name WAREHOUSE_POSITION 仓库仓位位置 */
    WAREHOUSE_POSITION = "WAREHOUSE_POSITION",

    /** @name PURCHASE_PRODUCT_TYPE 供应商类型 */
    PURCHASE_PRODUCT_TYPE = "PURCHASE_PRODUCT_TYPE",

    /** @name WAREHOUSE_UNIT 库房计量单位 */
    WAREHOUSE_UNIT = "WAREHOUSE_UNIT",

    /** @name WAREHOUSE_PRODUCT_TYPE 仓库产品类型 */
    WAREHOUSE_PRODUCT_TYPE = "WAREHOUSE_PRODUCT_TYPE",

    /** @name PRODUCT_BRAND 产品品牌 */
    PRODUCT_BRAND = "PRODUCT_BRAND",

    /** @name LOGISTSCS_COMPANY 物流公司 */
    LOGISTSCS_COMPANY = "LOGISTSCS_COMPANY",

    /** @name BANK 银行 */
    BANK = "BANK",
  }

  /**
   * @name CATEGORY_CONSTANT 词典类目 （本地默认写死的）
   * @description 有些组件会根据参数来取redux category的值，并且区分需要请求的枚举
   */
  export enum CATEGORY_CONSTANT {
    /** @name PURCHASE_SHIPPING_METHOD 采购单运输方式 */
    PURCHASE_SHIPPING_METHOD = "PURCHASE_SHIPPING_METHOD",

    /** @name PURCHASE_SETTLEMENT_METHOD 采购订单结算方式 */
    PURCHASE_SETTLEMENT_METHOD = "PURCHASE_SETTLEMENT_METHOD",

    /** @name PURCHASE_PROCESS_STAT 采购流程状态 */
    PURCHASE_PROCESS_STATUS = "PURCHASE_PROCESS_STATUS",

    /** @name SUPPLIER_LOG_TYPE 供应商供应报告日志 */
    SUPPLIER_LOG_TYPE = "SUPPLIER_LOG_TYPE",
  }
}
