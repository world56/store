import type { TypeSystemPermission } from "@/interface/system/permission";

export interface TypePermissionTree extends TypeSystemPermission.Info {
  disabled?: boolean;
  children: TypePermissionTree[];
}

/**
 * @name filterListToTree 生成权限树状图
 */
export function filterListToTree(
  list: TypeSystemPermission.InfoTree[] = [],
  disabledParam: { code?: string; name?: string; id?: string },
): any {
  const { id, name, code } = disabledParam;
  return list.map((val) => {
    const matching = val._id === id && code && name;
    return {
      ...val,
      disabled: val.code === code,
      value: matching ? code : val.code,
      label: matching ? name : val.name,
      children: filterListToTree(val.children, disabledParam),
    };
  });
}
