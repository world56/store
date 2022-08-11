import Statistics from './Statistics';
import styles from '../../index.module.sass';
import { InputNumber } from '@/components/Formatting';
import { Card, Form, Input, Table, Tooltip } from 'antd';
import ProductDetails from '@/components/Details/Product';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormHideKey, ReadOnlytext } from '@/components/Form';

import type { TypeWarehousingPurchaseQuery } from '../../';
import type { FormListFieldData } from 'antd/es/form/FormList';
import type { TypePurchaseOrder } from '@/interface/purchase/order';
import { useCallback, useState } from 'react';

export interface TypeProductConfirmProps
  extends
  TypeWarehousingPurchaseQuery,
  Partial<Pick<TypePurchaseOrder.DTO, 'total'>> { }

/**
 * @name ProductConfirm 产品确认清单
 */
const ProductConfirm: React.FC<TypeProductConfirmProps> = ({ total, form }) => {

  const [productId, setProductId] = useState<number>();

  const toProduct = useCallback((field?: FormListFieldData) => {
    if (field) {
      const products = form?.getFieldValue('products');
      const { id } = products[field.name];
      setProductId(id);
    } else {
      setProductId(undefined);
    }
  }, [form]);

  const columns = [
    {
      title: '产品名称',
      render: (field: FormListFieldData) => <>
        <FormHideKey name={[field.name, 'id']} />
        <Form.Item name={[field.name, 'name']}>
          <ReadOnlytext onClick={() => toProduct(field)} title='预览' />
        </Form.Item>
      </>
    },
    {
      title: '品牌',
      width: 250,
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'brand']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
    {
      title: '单位',
      width: 140,
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'unit']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
    {
      title: '规格',
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'specName']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
    {
      title: <>
        <span>采购量&nbsp;</span>
        <Tooltip title='采购单预定的采购数量'>
          <QuestionCircleOutlined />
        </Tooltip>
      </>,
      width: 150,
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'quantity']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
    {
      title: <>
        <span>有效数量&nbsp;</span>
        <Tooltip title='到货产品出现破损、丢失等情况，需要与采购部确认“有效到货量”'>
          <QuestionCircleOutlined />
        </Tooltip>
      </>,
      width: 150,
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'actualQuantity']}>
          <InputNumber placeholder='仅数字' min={0} />
        </Form.Item>
      )
    },
    {
      title: '备注',
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'remark']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
  ];

  return (
    <>
      <Card title='核对清单' extra={<Statistics total={total} />}>
        <Form.List name='products'>
          {(fields) => <Table
            rowKey='name'
            columns={columns}
            pagination={false}
            dataSource={fields}
            className={styles.table} />}
        </Form.List>
      </Card>

      <Card title='备注'>
        <Form.Item name='remark' noStyle>
          <Input.TextArea rows={4} placeholder='请输入备注' />
        </Form.Item>
      </Card>

      <ProductDetails id={productId} onClose={toProduct} />

    </>
  );
};

export default ProductConfirm;