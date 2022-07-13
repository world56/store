import { TypeSupplierProduct } from "@/interface/purchase/product";

/**
 * @name serverToForm 服务器的数据结构转为本地表单数据结构
 */
export function serverToForm(dto: TypeSupplierProduct.DTO) {
  const { supplier, category, unit, spec, ...data } = dto;
  return {
    ...data,
    unit: unit?.id,
    spec: spec?.map((v) => v.id),
    category: category?.map((v) => v.id),
    supplier: supplier?.map((v) => v.id),
  };
}
