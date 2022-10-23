import { Card, Form, Table } from "antd";
import Search from '@/components/Search';
import { DB_PRIMARY_KEY } from "@/config/db";
import { useCallback, useState } from "react";
import EditWarehouseProduct from "./components/EditWarehouseProduct";

import type { TypeWarehouseProduct } from "@/interface/warehouse/product";
import type { TypeEditWarehouseProductProps } from './components/EditWarehouseProduct';

const query = [{ name: 'name', label: '产品名称', type: Search.ENUM.COMP_TYPE.INPUT }];

/**
 * @name Product 产品盘点
 */
const Product = () => {

  const [form] = Form.useForm<TypeWarehouseProduct.Query>();

  const [edit,] = useState<TypeEditWarehouseProductProps>({ visible: false });

  const initializa = useCallback(async () => {
    const values = await form.validateFields();
    console.log(values);
  }, [form]);

  const columns = [
    { dataIndex: 'name', title: '产品名称' },
    { dataIndex: 'positionId', title: '仓位位置' },
    { dataIndex: 'count', title: '库存存量' },
    { dataIndex: 'alertQuantity', title: '警戒状态' },
  ];

  return (
    <Card title='产品盘点'>
      <Search form={form} columns={query} onSearch={initializa}></Search>
      <Table rowKey={DB_PRIMARY_KEY} columns={columns} dataSource={[]} />
      <EditWarehouseProduct {...edit} />
    </Card>
  );
};

export default Product;
