import { useState, useCallback, useMemo } from "react";

import type { TypeCommon } from "@/interface/common";

const pageSizeOptions = ["20", "50", "80", "100"];

function showTotal(total: number) {
  return `共 ${total} 条`;
}

export default function usePageTurning(totalNum: number | undefined) {
  const total = totalNum || 0;

  const [pagination, setPage] = useState<TypeCommon.PageTurning>({
    pageSize: 20,
    currentPage: 1,
  });

  const { pageSize, currentPage } = pagination;
  const pageIndex = (currentPage - 1) * pageSize;

  const onChange = useCallback(
    (currentPage: number, size?: number) => {
      setPage({ currentPage, pageSize: size || pageSize });
    },
    [pageSize],
  );

  const getPageIndex = useMemo(
    () => ({
      title: "序",
      render: (r: unknown, d: unknown, i: number) => pageIndex + i + 1,
    }),
    [pageIndex],
  );

  return {
    total,
    pageSize,
    onChange,
    showTotal,
    pageIndex,
    currentPage,
    getPageIndex,
    pageSizeOptions,
    showSizeChanger: true,
    showQuickJumper: true,
  };
}
