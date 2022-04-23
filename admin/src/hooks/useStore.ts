import { useSelector, shallowEqual } from "react-redux";

import type { TypeReduxStatus } from "@/interface/redux";

export interface UseStoreType extends TypeReduxStatus.Store {}

export default function useStore() {
  return useSelector((store: UseStoreType) => store, shallowEqual);
}
