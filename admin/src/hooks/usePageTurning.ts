import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { TypeCommon } from "@/interface/common";

const pageSizeOptions = ["20", "50", "80", "100"];

function showTotal(total: number) {
  return `共 ${total} 条`;
}

export default function usePageTurning(totalNum: number | undefined) {
  const total = totalNum || 0;

  const [query, setQuery] = useSearchParams();

  const [pagination, setPage] = useState<TypeCommon.PageTurning>({
    pageSize: Number(query.get("pageSize")) || 20,
    currentPage: Number(query.get("currentPage")) || 1,
  });

  const { pageSize, currentPage } = pagination;
  const pageIndex = (currentPage - 1) * pageSize;

  function onChange(currentPage: number, pageSize: number) {
    setPage({ currentPage, pageSize });
    setQuery(
      {
        ...Object.fromEntries(query.entries()),
        pageSize: pageSize.toString(),
        currentPage: currentPage.toString(),
      },
      { replace: true },
    );
  }

  return {
    total,
    pageSize,
    onChange,
    showTotal,
    pageIndex,
    currentPage,
    pageSizeOptions,
    showSizeChanger: true,
    showQuickJumper: true,
  };
}
