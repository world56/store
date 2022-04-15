/**
 * @name CONSTANT_REG 常量-常用的reg校验类型
 */
export namespace CONSTANT_REG {
  /**
   * @name EN reg校验-仅允许英文
   */
  export const EN = /^[A-Za-z]+$/;

  /**
   * @name CN reg校验-仅允许中文
   */
  export const CN = /^[\u4e00-\u9fa5]{0,}$/;

  /**
   * @name NUMBER_LETTER reg校验-含数字、字母、下划线
   */
  export const NUMBER_LETTER = /^[0-9a-zA-Z_]{1,}$/;

  /**
   * @name PHONE_NUMBER reg校验-13位手机号
   */
  export const PHONE_NUMBER = /^1[3456789]\d{9}$/;

  /**
   * @name E_MAIL reg校验-电子邮箱
   */
  export const E_MAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
