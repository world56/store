import { useRequest } from "ahooks";
import { Card, Form, Table } from "antd";
import Search from "@/components/Search";
import { getPaymentList } from "@/api/finance";
import { useCategorys, usePageTurning } from "@/hooks";
import { useCallback, useEffect, useMemo } from "react";
import EditPaymentStatus from "./components/EditPaymentStatus";

import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeFinancePayment } from "@/interface/finance/payment";

/**
 * @name FinancePayment 财务应付款
 */
const FinancePayment = () => {

  const { FINANCE_PAYABLES_TYPE, FINANCIAL_PAYABLES_STATUS } = useCategorys();

  const { data, loading, run } = useRequest(getPaymentList, { manual: true });

  const [search] = Form.useForm<TypeFinancePayment.Query>();

  const pagination = usePageTurning(data?.count);
  const { currentPage, pageSize } = pagination;

  const initializa = useCallback(async () => {
    const value = await search.validateFields();
    value.pageSize = pageSize;
    value.currentPage = currentPage;
    run(value);
  }, [search, currentPage, pageSize, run]);

  const query = useMemo(() => [
    { name: 'no', label: '流水号', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'type',
      label: '付款类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: FINANCE_PAYABLES_TYPE.LIST
    },
    {
      name: 'status',
      label: '付款状态',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: FINANCIAL_PAYABLES_STATUS.LIST
    },
  ], [FINANCE_PAYABLES_TYPE, FINANCIAL_PAYABLES_STATUS]);

  const columns = [
    { title: '流水号', dataIndex: 'no' },
    { title: '付款类型', dataIndex: 'type' },
    { title: '付款状态', dataIndex: 'status' },
    { title: '应付款总额', dataIndex: 'totalAmount' },
    { title: '实付款金额', dataIndex: 'actualPayment' },
    { title: '操作', key: 'id' },
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='应付款列表'>
      <Search form={search} columns={query} onSearch={initializa} />
      <Table
        loading={loading}
        columns={columns}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
        pagination={pagination} />
      <EditPaymentStatus />
    </Card>
  );
};

export default FinancePayment;
