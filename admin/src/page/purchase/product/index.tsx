import { useState } from "react";
import Search from "@/components/Search";
import { Button, Card, Form, Table } from "antd";
import EditProduct from "./components/EditProduct";
import { CodeSandboxOutlined } from '@ant-design/icons';

import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypePurchaseProduct } from "@/interface/purchase/product";

const query = [
  { name: 'name', label: '产品名称', type: Search.ENUM.COMP_TYPE.INPUT }
];

/**
 * @name Product 产品库
 */
const Product = () => {

  const [visible, setVisible] = useState(false);
  const [search] = Form.useForm<TypePurchaseProduct.Query>();

  const columns = [
    { key: 'name', dataIndex: 'name', title: '商品名称' }
  ];

  function onEdit() {
    const bol = !visible;
    setVisible(bol);
  }

  return (
    <Card title='供应产品库'>
      <Search form={search} columns={query} onSearch={() => { }}>
        <Button onClick={() => onEdit()} icon={<CodeSandboxOutlined />}>新增产品</Button>
      </Search>
      <Table columns={columns} rowKey={DB_PRIMARY_KEY} />
      <EditProduct id={1} visible={visible} onClose={onEdit} />
    </Card>
  );
};

export default Product;
