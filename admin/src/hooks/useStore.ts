import { useSelector, shallowEqual } from "react-redux";

import type { TypeCommon } from "@/interface/common";

export default function useStore() {
  return useSelector((state: TypeCommon.Store) => state, shallowEqual);
}
