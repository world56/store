import { Card, Form } from "antd";
import { useCategorys } from "@/hooks";
import Search from "@/components/Search";
import { useCallback, useMemo } from "react";

import type { TypeFinancePayment } from "@/interface/finance/payment";

/**
 * @name FinancePayment 财务应付款
 */
const FinancePayment = () => {

  const { FINANCE_PAYABLES_TYPE, FINANCIAL_PAYABLES_STATUS } = useCategorys();

  const [form] = Form.useForm<TypeFinancePayment.Query>();

  const initializa = useCallback(async () => {
    const value = await form.validateFields();
    console.log('@-value', value);
  }, [form]);

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

  return (
    <Card title='应付款列表'>
      <Search form={form} columns={query} onSearch={initializa} />
    </Card>
  );
};

export default FinancePayment;
