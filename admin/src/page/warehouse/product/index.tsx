import { useState } from "react";
import { Card, Form, Table } from "antd";
import Search from '@/components/Search';
import { DB_PRIMARY_KEY } from "@/config/db";
import EditWarehouseProduct from "./components/EditWarehouseProduct";

import type { TypeWarehouseProduct } from "@/interface/warehouse/product";
import type { TypeEditWarehouseProductProps } from './components/EditWarehouseProduct';


/**
 * @name Product 产品出入库管理
 */
const Product = () => {

  const [form] = Form.useForm<TypeWarehouseProduct.Query>();

  const [edit, setEdit] = useState<TypeEditWarehouseProductProps>({ visible: false });

  return (
    <Card title='产品出入库管理'>
      <Search form={form} columns={[]} onSearch={() => { }} />
      <Table rowKey={DB_PRIMARY_KEY} columns={[]} dataSource={[]} />
      <EditWarehouseProduct {...edit} />
    </Card>
  );
};

export default Product;
