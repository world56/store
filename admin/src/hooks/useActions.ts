import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { UserAction, SystemAction } from "@/store/action";

/* eslint-disable react-hooks/exhaustive-deps */
export default function useActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({ ...UserAction, ...SystemAction }, dispatch),
    [dispatch],
  );
}
