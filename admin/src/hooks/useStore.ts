import { useSelector, shallowEqual } from "react-redux";

import type { TypeReduxStatus } from "@/interface/redux";

export default function useStore() {
  return useSelector((store: TypeReduxStatus.Store) => store, shallowEqual);
}
