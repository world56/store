import { Table } from "antd";
import { useState } from "react";
import { Btn } from "@/layout/Button";
import { PreviewPicture } from '@/components/Details';
import { ProductDetails } from '@/components/Details';
import { OrderPriceQuantity } from "@/components/Details";

import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeCommon } from "@/interface/common";
import type { TypePurchaseOrderDetailsDisplayProps } from "..";
import type { TypeSupplierProduct } from "@/interface/purchase/product";

/**
 * @name Products 产品列表
 */
const Products: React.FC<TypePurchaseOrderDetailsDisplayProps> = ({ data }) => {

  const [productId, setProductId] = useState<TypeCommon.PrimaryKey>();

  function onSkip(row?: TypeSupplierProduct.DTO) {
    setProductId(row?.id);
  };

  const columns = [
    {
      title: '产品名称',
      dataIndex: 'product',
      render: (row: TypeSupplierProduct.DTO) => (
        <Btn onClick={() => onSkip(row)}>{row.name}</Btn>
      )
    },
    { title: '品牌', dataIndex: ['product', 'brand', 'name'] },
    { title: '规格', dataIndex: ['spec', 'name'] },
    { title: '单位', dataIndex: ['product', 'unit', 'name'] },
    { title: '单价(元)', dataIndex: 'unitPrice', render: (val: number) => val / 100 },
    { title: '数量', dataIndex: 'quantity' },
    { title: '备注', dataIndex: 'remark' },
  ];

  return (
    <>
      <ProductDetails id={productId} onClose={onSkip} />
      <OrderPriceQuantity total={data?.total} price={(data?.totalPrice || 0) / 100} />
      <Table
        columns={columns}
        pagination={false}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.products}
        expandable={{ expandedRowRender: r => <PreviewPicture pictures={r.product.pictures} /> }}
      />
    </>
  );
}

export default Products;
