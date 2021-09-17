import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { UserAction } from "@/store/action";

import type { DependencyList } from "react";

/* eslint-disable react-hooks/exhaustive-deps */
export default function useActions(deps?: DependencyList) {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({ ...UserAction }, dispatch),
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
