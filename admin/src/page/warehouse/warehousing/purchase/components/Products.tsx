import styles from '../index.module.sass';
import { Card, Form, Input, Table, Tooltip } from 'antd';
import { InputNumber } from '@/components/Formatting';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormHideKey, ReadOnlytext } from '@/components/Form';

import type { TypeWarehousingPurchaseQuery } from '../';
import type { FormListFieldData } from 'antd/es/form/FormList';

/**
 * @name Products 实际入库
 */
const Products: React.FC<TypeWarehousingPurchaseQuery> = (props) => {

  const columns = [
    {
      title: '产品名称',
      render: (field: FormListFieldData) => <>
        <FormHideKey name={[field.name, 'id']} />
        <Form.Item name={[field.name, 'name']}>
          <ReadOnlytext title='预览' />
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
      <Card title='核对清单' extra={<span>预计到货量：200</span>}>
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

    </>
  );
};

export default Products;
