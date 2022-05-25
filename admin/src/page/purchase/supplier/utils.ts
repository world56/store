import type { ValidateErrorEntity } from "rc-field-form/es/interface";
import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

/**
 * @name filterFormError 过滤表单“联系方式是否校验错误”
 */
export function filterFormError(e: unknown) {
  const { values, errorFields } =
    e as ValidateErrorEntity<TypePurchaseSupplier.DTO>;
  if (!values.name || !values.type) {
    return false;
  }
  return errorFields?.find((val) => {
    return val.name.find((v) => v.toString().includes("contacts"));
  });
}

/**
 * @name dtoServiceToForm 将后端的数据结构转为表单需要的数据结构
 */
export function dtoServiceToForm(dto: TypePurchaseSupplier.DTO) {
  const { type, ...data } = dto;
  return { ...data, type: type.map((v) => v.id) };
}
