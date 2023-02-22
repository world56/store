/**
 * @name ENUM_COMMON 枚举-通用枚举
 */
export namespace ENUM_COMMON {
  /**
   * @name STATUS 状态
   * @param FREEZE 冻结
   * @param ACTIVATE 激活
   */
  export enum STATUS {
    FREEZE,
    ACTIVATE,
  }

  /**
   * @name FILE_TYPE 文件类型
   * @param IMAGE 图片
   * @param VIDEO 视频
   * @param AUDIO 音频
   * @param DOCUMENT 文本
   * @param COMPRESSED 压缩文件
   * @param OTHER 其他类型
   */
  export enum FILE_TYPE {
    OTHER,
    IMAGE,
    VIDEO,
    AUDIO,
    DOCUMENT,
    COMPRESSED,
  }

  /**
   * @name LOG_MODULE 日志模块
   * @param PURCHASE 采购日志
   * @param SUPPLIER 供应商日志
   * @param SUPPLIER_PRODUCT 供应商产品
   * @param ADMIN_USER 用户
   */
  export enum LOG_MODULE {
    PURCHASE,
    SUPPLIER,
    SUPPLIER_PRODUCT,
    ADMIN_USER,
  }

  /**
   * @name CATEGORY_TYPE 类型类目
   * @param BANK 银行、支付宝列表
   * @param WAREHOUSE_UNIT 仓库计量单位
   * @param PURCHASE_PRODUCT_TYPE 供应商产品类目
   * @param WAREHOUSE_PRODUCT_TYPE 仓库产品类型
   * @param PRODUCT_BRAND 产品品牌
   * @param LOGISTSCS_COMPANY 物流公司
   */
  export enum CATEGORY_TYPE {
    BANK = 'BANK',
    WAREHOUSE_UNIT = 'WAREHOUSE_UNIT',
    PURCHASE_PRODUCT_TYPE = 'PURCHASE_PRODUCT_TYPE',
    WAREHOUSE_PRODUCT_TYPE = 'WAREHOUSE_PRODUCT_TYPE',
    PRODUCT_BRAND = 'PRODUCT_BRAND',
    LOGISTSCS_COMPANY = 'LOGISTSCS_COMPANY',
  }
}
