import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import Link from "@/components/Link";
import { useCategorys } from "@/hooks";
import { Card, Form, Table } from "antd";
import Search from "@/components/Search";
import { DB_PRIMARY_KEY } from "@/config/db";
import { toTime as render } from '@/utils/format';
import { getWarehousingList } from "@/api/warehouse";
import { useCallback, useEffect, useMemo } from "react";

import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeWarehouseWarehousing } from "@/interface/warehouse/warehousing";

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Warehousing 入库
 */
const Warehousing = () => {

  const category = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

  const { run, data } = useRequest(getWarehousingList, { manual: true });

  const [form] = Form.useForm<TypeWarehouseWarehousing.Query>();

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
    {
      name: 'status',
      label: '入库状态',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.WAREHOUSING_STATUS?.LIST
    },
    {
      name: 'creatorId',
      label: '创建人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.ADMIN_USER?.LIST
    },
    {
      name: 'inspectorId',
      label: '入库操作人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.ADMIN_USER?.LIST
    },
    { name: 'createTime', label: '创建时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
    { name: 'updateTime', label: '入库时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
  ], [category]);

  const columns = [
    {
      key: DB_PRIMARY_KEY,
      title: '流水号',
      render: (row: TypeWarehouseWarehousing.DTO) => (
        <Link to={`/warehouse/warehousingPurchase/${row.id}`}>{row.no}</Link>
      )
    },
    {
      dataIndex: 'type',
      title: '入库类型',
      render: (text: ENUM_WAREHOUSE.WAREHOUSING_TYPE) => (
        <Status status={text} matching={Status.type.WAREHOUSING_TYPE} />
      )
    },
    {
      dataIndex: 'status',
      title: '入库状态',
      render: (status: ENUM_WAREHOUSE.WAREHOUSING_STATUS) => (
        <Status status={status} matching={Status.type.WAREHOUSING_STATUS} />
      )
    },
    { dataIndex: ['creator', 'name'], title: '流程创建人' },
    {
      dataIndex: 'inspector',
      title: '入库清点人',
      render: (user: TypeWarehouseWarehousing.DTO['user']) => user?.name || '-'
    },
    { dataIndex: 'createTime', title: '创建时间', render },
    { dataIndex: 'updateTime', title: '检验时间', render },
    {
      id: 'id',
      title: '操作',
      render: (row: TypeWarehouseWarehousing.DTO) => (
        <Link to={`/warehouse/warehousingPurchase/${row.id}`}>入库</Link>
      )
    },
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='产品待入库'>
      <Search form={form} columns={query} onSearch={initializa} />
      <Table columns={columns} dataSource={data?.list} rowKey={DB_PRIMARY_KEY} />
    </Card>
  );
};

export default Warehousing;
