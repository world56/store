import { useRequest } from "ahooks";
import { Btn } from "@/layout/Button";
import { Link } from 'react-router-dom';
import Search from "@/components/Search";
import { User } from '@/components/Tooltip';
import { Status } from "@/components/Status";
import { toTime as render } from '@/utils/format';
import { Card, Form, message, Table } from "antd";
import { PurchaseOrder } from "@/components/Details";
import { useCategorys, usePageTurning } from "@/hooks";
import { showConfirmReceipt, showCountTheGoods } from './utils';
import { useCallback, useEffect, useMemo, useState } from "react";
import { confirmReceiving, getWarehousingList } from "@/api/warehouse";

import { DB_PRIMARY_KEY } from "@/config/db";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "@/interface/common";
import type { TypeWarehouseWarehousing } from "@/interface/warehouse/warehousing";

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Warehousing 待入库列表
 */
const Warehousing = () => {

  const [id, setId] = useState<TypeCommon.PrimaryKey>();

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

  const onView = useCallback((row?: TypeWarehouseWarehousing.DTO) => {
    setId(row?.id);
  }, []);

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
      list: category?.WAREHOUSING_PROCESS_STATUS?.LIST,
    },
    {
      name: 'creatorId',
      label: '创建人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.ADMIN_USER?.LIST
    },
    {
      name: 'consigneeId',
      label: '收货人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.ADMIN_USER?.LIST
    },
    {
      name: 'inspectorId',
      label: '入库人',
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
        <Btn onClick={() => onView(row)}>{row.order.no}</Btn>
      )
    },
    {
      dataIndex: 'type',
      title: '入库类型',
      render: (text: ENUM_WAREHOUSE.WAREHOUSING_TYPE) => (
        <Status status={text} matching={category.WAREHOUSING_TYPE.OBJ} />
      )
    },
    {
      dataIndex: 'status',
      title: '入库状态',
      render: (status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS) => (
        <Status status={status} matching={category.WAREHOUSING_PROCESS_STATUS.OBJ} />
      )
    },
    {
      key: 'id',
      title: '流程创建人',
      render: (row: TypeWarehouseWarehousing.DTO) => (
        <User user={category.ADMIN_USER?.OBJ?.[row.order.creatorId]} />
      )
    },
    {
      key: 'id',
      title: '收货人',
      render: (row: TypeWarehouseWarehousing.DTO) => (
        <User user={category.ADMIN_USER?.OBJ?.[row.consigneeId]} />
      )
    },
    {
      key: 'id',
      title: '入库清点人',
      render: (row: TypeWarehouseWarehousing.DTO) => (
        <User user={category.ADMIN_USER?.OBJ?.[row.inspectorId]} />
      )
    },
    { dataIndex: 'createTime', title: '创建时间', render },
    { dataIndex: 'updateTime', title: '检验时间', render },
    {
      id: 'id',
      title: '操作',
      render: (row: TypeWarehouseWarehousing.DTO) => {
        const isEdit = showCountTheGoods(row.status);
        const waitingForReceipt = showConfirmReceipt(row.status);
        return <>
          <Btn onClick={() => onConfirm(row)} show={waitingForReceipt}>确认收货</Btn>
          {isEdit ? <Link to={`/warehouse/warehousingPurchase/${row.id}`}>清点入库</Link> : null}
          <Btn onClick={() => onView(row)}>详情</Btn>
        </>
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
      <PurchaseOrder id={id} onClose={onView} />
    </Card>
  );
};

export default Warehousing;
