import { ENUM_STORE_ACTION_TYPE } from "@/enum/store";

/**
 * @name setNavCollapsed 改变导航栏状态
 */
export function setNavCollapsed() {
  return {
    type: ENUM_STORE_ACTION_TYPE.SYSTEM.SET_NAV_STATUS,
  };
}
