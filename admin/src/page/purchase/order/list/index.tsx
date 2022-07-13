import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import { Btn } from "@/layout/Button";
import Search from '@/components/Search';
import { Button, Card, Form, Table } from "antd";
import { getPurchaseOrderList } from "@/api/purchase";
import { OrderedListOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useActions, usePageTurning, useStore } from "@/hooks";
import { toTime as render, convertCurrencyUnits } from '@/utils';

import { ENUM_STORE } from "@/enum/store";
import { DB_PRIMARY_KEY } from '@/config/db';
import { ENUM_PURCHASE } from "@/enum/purchase";

import type { TypePurchaseOrder } from "@/interface/purchase/order";

/**
 * @name SupplierOrder 采购订单
 */
const SupplierOrder = () => {

  const actions = useActions();
  const navigate = useNavigate();
  const { category } = useStore();

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

  function onEdit(row?: TypePurchaseOrder.DTO) {
    navigate({
      pathname: '/purchase/supplierOrderEdit',
      search: `?id=${row?.id}`,
    });
  };

  const query = useMemo(() => [
    { name: 'id', label: '订单编号', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'creatorId',
      label: '创建人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.ADMIN_USER?.LIST
    },
    { name: 'createTime', label: '创建时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
  ], [category]);

  const columns = [
    { key: DB_PRIMARY_KEY, dataIndex: DB_PRIMARY_KEY, title: '订单号', width: 200 },
    {
      key: 'supplier',
      dataIndex: 'supplier',
      title: '供应商',
      render: (row: TypePurchaseOrder.DTO['supplier']) => (
        <NavLink to={`/purchase/supplierDetails/${row.id}`}>{row?.name}</NavLink>
      )
    },
    { key: 'total', dataIndex: 'total', title: '采购量' },
    { key: 'totalPrice', dataIndex: 'totalPrice', title: '总价（元）', render: convertCurrencyUnits },
    {
      key: 'settlement',
      dataIndex: 'settlement',
      width: 150,
      title: '结算方式',
      render: (type: ENUM_PURCHASE.SUPPLIER_SETTLEMENT) => (
        <Status status={type} matching={Status.type.PURCHASE_ORDER_SETTLEMENT} />
      )
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '订单状态',
      render: (status: ENUM_PURCHASE.SUPPLIER_ORDER_STATUS) => (
        <Status status={status} matching={Status.type.PURCHASE_ORDER} />
      )
    },
    { key: 'createTime', dataIndex: 'createTime', title: '创建时间', width: 180, render },
    { key: 'creator', dataIndex: ['creator', 'name'], title: '创建人' },
    {
      key: 'status',
      title: '操作',
      width: 120,
      render: (row: TypePurchaseOrder.DTO) => [
        <NavLink key='1' to={`/purchase/supplierOrderDetails/${row.id}`}>详情</NavLink>,
        <Btn key='2' onClick={() => onEdit(row)}>编辑</Btn>,
      ]
    }
  ];

  useEffect(() => {
    actions.getCategory([ENUM_STORE.CATEGORY.ADMIN_USER]);
  }, [actions]);

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='采购订单'>
      <Search form={search} columns={query} onSearch={initializa}>
        <Button onClick={() => onEdit()}>
          <OrderedListOutlined /> 新建采购单
        </Button>
      </Search>
      <Table
        loading={loading}
        columns={columns}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
        pagination={pagination} />
    </Card>
  );
};

export default SupplierOrder;
