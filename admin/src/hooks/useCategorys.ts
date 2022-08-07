import useStore from "./useStore";
import useActions from "./useActions";
import Actions from "@/store/middleware/actions";
import { DependencyList, useEffect } from "react";

import { ENUM_STORE } from "@/enum/store";

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

useCategorys.ENUM_CATEGORY = ENUM_STORE.CATEGORY;
