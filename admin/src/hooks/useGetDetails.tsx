import { isVoid } from "@/utils";
import { useState, useEffect, useCallback } from "react";

import type { DependencyList } from 'react';

type TypePromiseFn<T = unknown> = (...rgas: unknown[]) => Promise<T>;

interface TypeUseGetDetailsState<T extends TypePromiseFn> {
  loading: boolean;
  value?: Awaited<ReturnType<T>> | undefined;
};

/**
 * @name useGetDetails 快速查询
 * @returns 适用于详情页面
 */
export default function useGetDetails<T extends TypePromiseFn<any>>(fn: T, dep: DependencyList = []) {

  const [state, setState] = useState<TypeUseGetDetailsState<T>>({ loading: false });

  const initializa = useCallback(async () => {
    const [bol] = dep;
    if (!isVoid(bol)) {
      try {
        setState({ loading: true });
        const value = await fn();
        setState({ loading: false, value });
      } catch {
        setState({ loading: false, value: undefined });
      }
    }
    // eslint-disable-next-line
  }, dep);

  useEffect(() => {
    initializa();
  }, [initializa]);

  return {
    ...state,
    run: initializa
  };
};
