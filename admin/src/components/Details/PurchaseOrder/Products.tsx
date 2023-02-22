import { Table, Tooltip } from "antd";
import { Btn } from "@/layout/Button";
import { useCategorys } from '@/hooks';
import ProductDetails from '../Product';
import styles from './index.module.sass';
import { useCallback, useState } from "react";
import StatisticsBanner from "../StatisticsBanner";
import { QuestionCircleOutlined } from '@ant-design/icons';

import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeOrderStatisticsProps } from '.';
import type { TypeCommon } from "@/interface/common";
import type { TypePurchaseOrder } from "@/interface/purchase/order";
import type { TypeWarehousingAudit } from "@/interface/warehouse/audit";

interface TypeProductsProps
  extends
  TypeOrderStatisticsProps,
  Partial<Pick<TypeWarehousingAudit.PurchaseOrderAuditDetails, 'order'>> {
}

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Products 采购产品列表
 */
const Products: React.FC<TypeProductsProps> = ({
  show,
  order,
  className,
  actualTotal,
  actualTotalPrice
}) => {

  const [productId, setProductId] = useState<TypeCommon.PrimaryKey>();

  const category = useCategorys([ENUM_CATEGORY.WAREHOUSE_UNIT, ENUM_CATEGORY.PRODUCT_BRAND]);

  const onProductDetails = useCallback((row?: TypePurchaseOrder.ProductDetails) => {
    setProductId(row?.product.id);
  }, []);

  // 有效数量 与 采购数量不一致 则Table背景色标记为红色
  function rowClassName(row: TypePurchaseOrder.ProductDetails) {
    return show ? row.actualQuantity !== row.quantity ? styles.difference : '' : styles.waiting;
  };

  const statisticsItems = show ? [
    { title: '采购总量', value: order?.total },
    { title: '实到总量', value: actualTotal, className, },
    { title: '采购总价', value: `${(order?.totalPrice || 0) / 100} 元` },
    { title: '实际应付', value: `${actualTotalPrice} 元`, className, },
  ] : [
    { title: '采购总量', value: order?.total },
    { title: '采购总价', value: `${(order?.totalPrice || 0) / 100} 元` },
  ];

  const columns = [
    {
      key: 'id',
      title: '产品名称',
      render: (row: TypePurchaseOrder.ProductDetails) => (
        <Btn onClick={() => onProductDetails(row)} >{row?.product?.name}</Btn>
      )
    },
    {
      dataIndex: ['product', 'brandId'],
      title: '品牌',
      render: (brandId: TypeCommon.PrimaryKey) => (
        <Tooltip title={category.PRODUCT_BRAND?.OBJ[brandId].remark}>
          {category.PRODUCT_BRAND?.OBJ[brandId].name}
        </Tooltip>
      )
    },
    {
      dataIndex: 'spec',
      title: '规格',
      render: (row: TypePurchaseOrder.ProductDetails['spec']) => (
        <Tooltip title={row.remark}>
          {row.name}
        </Tooltip>
      )
    },
    {
      dataIndex: ['product', 'unitId'],
      title: '单位',
      width: 120,
      render: (unitId: TypeCommon.PrimaryKey) => (
        <Tooltip title={category?.WAREHOUSE_UNIT?.OBJ?.[unitId]?.name}>
          {category?.WAREHOUSE_UNIT?.OBJ?.[unitId]?.name}
        </Tooltip>
      )
    },
    {
      dataIndex: 'unitPrice',
      title: '单价(元)',
      width: 150,
      render: (unitPrice: number) => unitPrice / 100
    },
    {
      dataIndex: 'quantity',
      title: <>
        <span>采购量&nbsp;</span>
        <Tooltip title='采购单预定的采购数量'>
          <QuestionCircleOutlined />
        </Tooltip>
      </>,
      width: 120
    },
    {
      dataIndex: 'actualQuantity',
      title: <>
        <span>有效数量&nbsp;</span>
        <Tooltip title='产品出现破损、丢失等情况，需要与采购部确认“有效到货量”'>
          <QuestionCircleOutlined />
        </Tooltip>
      </>,
      width: 120,
      render: (num: number) => show ? num : '未清点'
    },
  ];

  return (
    <>
      <ProductDetails id={productId} onClose={onProductDetails} />
      <Table
        columns={columns}
        pagination={false}
        rowKey={DB_PRIMARY_KEY}
        rowClassName={rowClassName}
        dataSource={order?.products}
      />
      <StatisticsBanner items={statisticsItems} />
    </>
  );
};

export default Products;
