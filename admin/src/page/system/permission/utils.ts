import type { TypeCommon } from "@/interface/common";
import type { TypeSystemPermission } from "@/interface/system/permission";

export interface TypePermissionTree extends TypeSystemPermission.DTO {
  disabled?: boolean;
  children: TypePermissionTree[];
}

/**
 * @name filterListToTree 生成权限树
 * @param list service data
 */
export function filterListToTree(
  list: TypeSystemPermission.DTO[] = [],
  parentId = 0,
  id?: number,
): TypeSystemPermission.DTO[] {
  let parentObj: TypeCommon.GenericObject<TypeSystemPermission.InfoTree> = {};
  list.forEach((o) => (parentObj[o.id] = o));
  return list
    .filter((v) => (parentId ? v.parentId === parentId : !parentObj[v.parentId]))
    .map((o) => ({
      ...parentObj[o.id],
      disabled: o.id === id,
      children: filterListToTree(list, o.id, id),
    }));
}
