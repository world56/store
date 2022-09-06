import { useRequest } from "ahooks";
import Link from "@/components/Link";
import Status from "@/layout/Status";
import { Btn } from "@/layout/Button";
import Search from '@/components/Search';
import { showEditBtn, showAbandoned } from './utils';
import { getPurchaseOrderList } from "@/api/purchase";
import { useCategorys, usePageTurning } from "@/hooks";
import { OrderedListOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Form, message, Table } from "antd";
import { toTime as render, monetaryUnit, urlSearchParams } from '@/utils/format';

import { DB_PRIMARY_KEY } from '@/config/db';
import { ENUM_PURCHASE } from "@/enum/purchase";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypePurchaseOrder } from "@/interface/purchase/order";
import { scrapPurchaseOrder } from "@/api/warehouse";

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

  const onAbandoned = useCallback(async (row: TypePurchaseOrder.DTO) => {
    const { id } = row.warehousing;
    await scrapPurchaseOrder({ id });
    message.success('订单已废弃');
    initializa();
  }, [initializa]);

  const query = useMemo(() => [
    { name: 'no', label: '流 水 号', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'shippingNoteNumber', label: '运输单号', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'shippingMethod',
      label: '发货方式',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.SUPPLIER_SHIPPING_METHOD?.LIST
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
      list: category?.SUPPLIER_SETTLEMENT?.LIST
    },
    {
      name: 'status',
      label: '订单状态',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.WAREHOUSING_PROCESS?.LIST
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
          <Link to={`/purchase/supplierOrderDetails/${row.id}`}>{row.no}</Link>
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
        render: (type: ENUM_PURCHASE.SUPPLIER_SETTLEMENT) => (
          <Status status={type} matching={Status.type.PURCHASE_ORDER_SETTLEMENT} />
        )
      },
      {
        title: '订单状态',
        dataIndex: ['warehousing', 'status'],
        render: (status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS) => (
          <Status status={status} matching={Status.type.WAREHOUSING_STATUS} />
        )
      },
      {
        key: 'status',
        title: '操作',
        width: 140,
        render: (row: TypePurchaseOrder.DTO) => (
          <>
            {showAbandoned(row) && <Btn confirmTips type='danger' onClick={() => onAbandoned(row)}>作废</Btn>}
            {showEditBtn(row) && <Btn onClick={() => onEdit(row)}>编辑</Btn>}
            <Link to={`/purchase/supplierOrderDetails/${row.id}`}>详情</Link>
          </>
        )
      }
    ]
    supplierId && list.splice(1, 1);
    return list;
  }, [supplierId, onEdit, onAbandoned]);

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
