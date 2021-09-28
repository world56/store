import { useSelector, shallowEqual } from "react-redux";

import type { TypeStoreStatus } from "@/interface/store";

export interface UseStoreType extends TypeStoreStatus {}

export default function useStore() {
  return useSelector((store: UseStoreType) => store, shallowEqual);
}
