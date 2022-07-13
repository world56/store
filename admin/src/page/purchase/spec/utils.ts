import type { TypeSpec } from "@/interface/purchase/spec";

/**
 * @name SpecServiceToFrom 规格类目模板转为表单数据结构
 */
export function SpecServiceToFrom(list: TypeSpec.DTO) {
  return {
    ...list,
    parameter: list.parameter.map((v) => v.id),
  };
}

/**
 * @name specParameterServiceToFrom 规格类目模板转为表单数据结构
 */
export function specParameterServiceToFrom(list: TypeSpec.SpecParameterDTO) {
  return {
    ...list,
    spec: list.spec.map((v) => v.id),
  };
}
