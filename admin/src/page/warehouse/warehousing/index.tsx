import { Card, Form, Table } from "antd";
import { useStore } from "@/hooks";
import Search from "@/components/Search";
import { useCallback, useEffect, useMemo } from "react";
import { DB_PRIMARY_KEY } from "@/config/db";
import { useRequest } from "ahooks";
import { getWarehousingList } from "@/api/warehouse";

/**
 * @name Warehousing 入库
 */
const Warehousing = () => {

  const { category } = useStore();

  const { run } = useRequest(getWarehousingList, { manual: true });

  const [form] = Form.useForm();

  const initializa = useCallback(async () => {
    const values = await form.validateFields();
    values.pageSize = 1;
    values.currentPage = 1;
    run(values);
  }, [form, run]);

  const query = useMemo(() => [
    {
      name: 'type',
      label: '入库类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.WAREHOUSING_TYPE?.LIST
    },
    { name: 'createTime', label: '创建时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
    { name: 'updateTime', label: '入库时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
  ], [category]);

  const columns = [
    { dataIndex: 'name', title: '创建时间' },
  ];

  useEffect(()=>{
    initializa();
  },[initializa]);

  return (
    <Card title='产品待入库'>
      <Search form={form} columns={query} onSearch={initializa} />
      <Table columns={columns} dataSource={[]} rowKey={DB_PRIMARY_KEY} />
    </Card>
  );
};

export default Warehousing;
