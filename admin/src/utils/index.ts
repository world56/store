import JsEncrypt from "jsencrypt";

import { ENUM_COMMON } from "@/enum/common";

import type { FormListFieldData } from "antd/es/form/FormList";

/**
 * @name encryption 加密
 */
export function encryption(pubilcKey: string, text: string) {
  const encrypt = new JsEncrypt();
  encrypt.setPublicKey(pubilcKey);
  const ciphertext = encrypt.encrypt(text);
  return ciphertext as string;
}

/**
 * @name isVoid 判断值是否为void
 */
export function isVoid(param: unknown): param is boolean {
  return (
    param === undefined || param === null || param === "" || Number.isNaN(param)
  );
}

/**
 *
 * @name createRandNum 生成随机数
 * @param length 随机数个数
 */
export function createRandNum(length: number = 10) {
  const num: number[] = [];
  for (let i = 0; i <= length; i++) {
    num.push(Math.floor(Math.random() * 10));
  }
  return num;
}

/**
 * @name formNestedFields 生成表单嵌套字段
 */
export function formNestedFields(itemProps: FormListFieldData, name: string) {
  return {
    name: itemProps ? [itemProps.name, name] : name,
    fieldKey: itemProps ? [itemProps.key, name] : name,
  };
}

/**
 * @name statusReversal 反转状态
 */
export function statusReversal(status: ENUM_COMMON.STATUS | undefined) {
  return status === ENUM_COMMON.STATUS.ACTIVATE
    ? ENUM_COMMON.STATUS.FREEZE
    : ENUM_COMMON.STATUS.ACTIVATE;
}
