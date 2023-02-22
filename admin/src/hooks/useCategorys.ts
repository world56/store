import { useEffect } from "react";
import useStore from "./useStore";
import useActions from "./useActions";
import Actions from "@/store/middleware/actions";

import { ENUM_STORE } from "@/enum/store";

import type { DependencyList } from "react";

/**
 * @name useCategorys 获取类目（字典）
 */
export default function useCategorys(
  prop?: Parameters<typeof Actions.getCategory>[0],
  deps?: DependencyList,
) {
  const actions = useActions();

  const { category } = useStore();

  useEffect(
    () => {
      prop?.length && actions.getCategory(prop);
    },
    // eslint-disable-next-line
    deps ? [actions, ...deps] : [actions],
  );

  return category;
}

useCategorys.ENUM_CATEGORY = ENUM_STORE.CATEGORY;
