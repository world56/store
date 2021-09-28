/**
 * @name CONSTANT_REG 常量-常用的reg校验类型
 */
export namespace CONSTANT_REG {
  /**
   * @name NUMBER_LETTER reg校验-含数字、字母、下划线
   */
  export const NUMBER_LETTER = /^[0-9a-zA-Z_]{1,}$/;

  /**
   * @name PHONE_NUMBER reg校验-13位手机号
   */
  export const PHONE_NUMBER = /^1[3456789]\d{9}$/;
}
