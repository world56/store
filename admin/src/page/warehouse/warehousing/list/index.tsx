import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import Link from "@/components/Link";
import { editableBtn } from './utils';
import Search from "@/components/Search";
import { DB_PRIMARY_KEY } from "@/config/db";
import { toTime as render } from '@/utils/format';
import { Card, Form, message, Table } from "antd";
import { Link as LinkTo } from 'react-router-dom';
import { useCategorys, usePageTurning } from "@/hooks";
import { useCallback, useEffect, useMemo } from "react";
import { confirmReceiving, getWarehousingList } from "@/api/warehouse";

import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeWarehouseWarehousing } from "@/interface/warehouse/warehousing";
import { Btn } from "@/layout/Button";

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Warehousing 待入库列表
 */
const Warehousing = () => {

  const category = useCategorys([ENUM_CATEGORY.ADMIN_USER]);
  const [form] = Form.useForm<TypeWarehouseWarehousing.Query>();

  const { run, data } = useRequest(getWarehousingList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await form.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, form, pageSize, currentPage]);

  async function onConfirm(row: TypeWarehouseWarehousing.DTO) {
    await confirmReceiving({ id: row.id });
    message.success('确认成功');
    initializa();
  };

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
      list: category?.WAREHOUSING_PROCESS?.LIST
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
      render: (status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS) => (
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
      render: (row: TypeWarehouseWarehousing.DTO) => {
        const isEdit = editableBtn(row.status);
        if (row.status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED) {
          return <Btn onClick={() => onConfirm(row)} >确认收货</Btn>
        } else {
          return <LinkTo to={`/warehouse/warehousingPurchase/${row.id}`}>{isEdit ? '清点入库' : '详情'}</LinkTo>
        }
      }
    },
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='产品待入库'>
      <Search form={form} columns={query} onSearch={initializa} />
      <Table
        columns={columns}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
        pagination={pagination} />
    </Card>
  );
};

export default Warehousing;
