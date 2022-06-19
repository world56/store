import { useRequest } from "ahooks";
import { Card, Form, Table } from "antd";
import Search from '@/components/Search';
import { usePageTurning } from "@/hooks";
import { useCallback, useMemo } from "react";
import { getPurchaseOrderList } from "@/api/purchase";
import { TypePurchaseOrder } from "@/interface/purchase/order";

const columns = [
  { key: 'createTime', dataIndex: 'createTime', title: '创建时间' },
  { key: 'status', dataIndex: 'status', title: '订单状态' },
];

/**
 * @name SupplierOrder 采购订单
 */
const SupplierOrder = () => {

  const [search] = Form.useForm<TypePurchaseOrder.Query>();

  const { run, data, loading } = useRequest(getPurchaseOrderList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  const query = useMemo(() => [
    { name: 'id', label: '订单编号', type: Search.ENUM.COMP_TYPE.INPUT }
  ], []);

  return (
    <Card title='采购订单'>
      <Search form={search} columns={query} onSearch={initializa} />
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.list}
        pagination={pagination} />
    </Card>
  );
};

export default SupplierOrder;
