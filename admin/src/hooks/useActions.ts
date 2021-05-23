import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useMemo, DependencyList } from "react";

import type { ActionCreatorsMapObject } from "redux";

/* eslint-disable react-hooks/exhaustive-deps */
export default function useActions(
  actions: ActionCreatorsMapObject,
  deps?: DependencyList,
) {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(actions, dispatch),
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
