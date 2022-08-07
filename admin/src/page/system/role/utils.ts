import type { TypeSystemRole } from "@/interface/system/role";

/**
 * @name serviceToForm db转换至表单结构
 */
export function serviceToForm(data: TypeSystemRole.DTO) {
  return {
    ...data,
    permissionId: data.permissions.map((v) => v.id),
  };
}
