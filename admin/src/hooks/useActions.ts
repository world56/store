import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useMemo, DependencyList } from "react";
import { UserAction } from "@/store/action";

/* eslint-disable react-hooks/exhaustive-deps */
export default function useActions(deps?: DependencyList) {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({ ...UserAction }, dispatch),
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
