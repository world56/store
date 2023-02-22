import { useRequest } from "ahooks";
import { Btn } from "@/layout/Button";
import { showAbandoned } from './utils';
import Search from '@/components/Search';
import { Status } from "@/components/Status";
import { editPurchaseOrder } from "@/utils/status";
import { PurchaseOrder } from "@/components/Details";
import { getPurchaseOrderList } from "@/api/purchase";
import { useCategorys, usePageTurning } from "@/hooks";
import { OrderedListOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Form, message, Table } from "antd";
import { terminationPurchaseOrder } from "@/api/purchase";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toTime as render, monetaryUnit, urlSearchParams } from '@/utils/format';

import { DB_PRIMARY_KEY } from '@/config/db';
import { ENUM_PURCHASE } from "@/enum/purchase";

import type { TypeCommon } from "@/interface/common";
import type { TypePurchaseOrder } from "@/interface/purchase/order";

interface TypeSupplierOrderProps extends Pick<TypePurchaseOrder.Query, 'supplierId'> { }

const { ENUM_CATEGORY } = useCategorys;


/**
 * @name SupplierOrder 采购订单
 */
const SupplierOrder: React.FC<TypeSupplierOrderProps> = ({ supplierId }) => {

  const category = useCategorys([
    ENUM_CATEGORY.ADMIN_USER,
    ENUM_CATEGORY.PURCHASE_SUPPLIER,
    ENUM_CATEGORY.LOGISTSCS_COMPANY,
  ]);

  const navigate = useNavigate();

  const [warehouseOrderId, setWarehouseOrderId] = useState<TypeCommon.PrimaryKey>();

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

  const onEdit = useCallback((row?: TypePurchaseOrder.DTO) => {
    navigate({
      pathname: '/purchase/supplierOrderEdit',
      search: urlSearchParams({ supplierId, id: row?.id })
    });
  }, [navigate, supplierId]);

  const onAbandoned = useCallback(async ({ id }: TypePurchaseOrder.DTO) => {
    await terminationPurchaseOrder({ id });
    message.success('订单已废弃');
    initializa();
  }, [initializa]);

  const onView = useCallback((row?: TypePurchaseOrder.DTO) => {
    setWarehouseOrderId(row?.warehousing?.id);
  }, []);

  const query = useMemo(() => [
    { name: 'no', label: '流 水 号', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'shippingNoteNumber', label: '运输单号', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'shippingMethod',
      label: '发货方式',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PURCHASE_SHIPPING_METHOD?.LIST
    },
    {
      name: 'logisticsCompanyId',
      label: '物流公司',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.LOGISTSCS_COMPANY?.LIST
    },
    {
      name: 'supplierId',
      label: '供 应 商',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PURCHASE_SUPPLIER?.LIST,
      hide: () => Boolean(supplierId),
      initialValue: supplierId,
    },
    {
      name: 'settlement',
      label: '结算方式',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PURCHASE_SETTLEMENT_METHOD?.LIST
    },
    {
      name: 'status',
      label: '订单状态',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PURCHASE_PROCESS_STATUS?.LIST
    },
    {
      name: 'creatorId',
      label: '创建人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.ADMIN_USER?.LIST
    },
    { name: 'createTime', label: '创建时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
  ], [category, supplierId]);

  const columns = useMemo(() => {
    const list = [
      {
        key: DB_PRIMARY_KEY,
        title: '流水号',
        render: (row: TypePurchaseOrder.DTO) => (
          <Btn onClick={() => onView(row)}>{row?.no}</Btn>
        )
      },
      {
        dataIndex: 'supplier',
        title: '供应商',
        render: (row: TypePurchaseOrder.DTO['supplier']) => (
          <NavLink to={`/purchase/supplierDetails/${row.id}`}>{row?.name}</NavLink>
        )
      },
      { dataIndex: ['creator', 'name'], title: '创建人' },
      { dataIndex: 'createTime', title: '创建时间', width: 180, render },
      { dataIndex: 'total', title: '采购量' },
      { dataIndex: 'totalPrice', title: '总价（元）', render: monetaryUnit },
      {
        dataIndex: 'settlement',
        width: 150,
        title: '结算方式',
        render: (type: ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD) => (
          <Status status={type} matching={category.PURCHASE_SETTLEMENT_METHOD.OBJ} />
        )
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        render: (status: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS) => (
          <Status status={status} matching={category.PURCHASE_PROCESS_STATUS.OBJ} />
        )
      },
      {
        key: 'status',
        title: '操作',
        width: 150,
        render: (row: TypePurchaseOrder.DTO) => (
          <>
            {showAbandoned(row) && <Btn confirmTips type='danger' onClick={() => onAbandoned(row)}>作废</Btn>}
            {!editPurchaseOrder(row) && <Btn onClick={() => onEdit(row)}>编辑</Btn>}
            <Btn onClick={() => onView(row)}>详情</Btn>
          </>
        )
      }
    ]
    supplierId && list.splice(1, 1);
    return list;
  }, [category, supplierId, onEdit, onView, onAbandoned]);

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
      <PurchaseOrder id={warehouseOrderId} onClose={onView} />
    </Card>
  );
};

export default SupplierOrder;
