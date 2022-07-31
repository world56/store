import useStore from "./useStore";
import useActions from "./useActions";
import Actions from "@/store/middleware/actions";
import { DependencyList, useEffect } from "react";

import { ENUM_STORE } from "@/enum/store";

const ENUM_CATEGORY = {
  ...ENUM_STORE.CATEGORY,
  ...ENUM_STORE.CATEGORY_DEFAULT,
};

/**
 * @name useCategorys 获取类目（枚举）
 */
export default function useCategorys(
  prop?: Parameters<typeof Actions.getCategory>[0],
  deps?: DependencyList,
) {
  const actions = useActions();

  const { category } = useStore();

  useEffect(
    () => {
      prop && actions.getCategory(prop);
    },
    // eslint-disable-next-line
    deps ? [actions, ...deps] : [actions],
  );

  return category;
}

/**
 * @name ENUM_CATEGORY 枚举
 */
useCategorys.ENUM_CATEGORY = ENUM_CATEGORY;
