import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { UserAction, SystemAction, dictionaryAction } from "@/store/action";

export default function useActions() {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        { ...UserAction, ...SystemAction, ...dictionaryAction },
        dispatch,
      ),
    [dispatch],
  );
}
