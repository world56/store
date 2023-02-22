import { useRequest } from 'ahooks';
import Statistics from "./Statistics";
import { Btn } from '@/layout/Button';
import styles from '../index.module.sass';
import { QueryProduct } from '@/components/Query';
import { filterDuplicatesProduct } from '../utils';
import { useEffect, useRef, useState } from 'react';
import { filterOptionTooltip } from '@/utils/filter';
import { querySupplierProduct } from '@/api/purchase';
import { InputNumber } from '@/components/Formatting';
import { ProductDetails } from '@/components/Details';
import { FormHideKey, ReadOnlytext } from '@/components/Form';
import { Form, Table, Card, Select, Tooltip, message } from "antd";

import type { FormInstance } from 'antd/es';
import type { TypeCommon } from '@/interface/common';
import type { RuleObject } from 'rc-field-form/lib/interface';
import type { FormListFieldData } from 'antd/es/form/FormList';
import type { TypePurchaseOrder } from '@/interface/purchase/order';
import type { TypeSupplierProduct } from "@/interface/purchase/product";
import type { TypeSelectProductSelectKey } from '@/components/Query/Product/Select';

interface TypeSupplierProductProps {
  /** @param editStatus 可否编辑 */
  editStatus?: boolean;
  form: FormInstance<TypePurchaseOrder.EditDTO>;
};

const { Option } = Select;
const rules = [{ required: true }];
const selectShow = { keepParent: false };

/**
 * @name SupplierProduct 选择供应产品
 */
const SupplierProduct: React.FC<TypeSupplierProductProps> = ({ form, editStatus }) => {

  const RefQuery = useRef<TypeSelectProductSelectKey>(null!);

  const [productId, setProductId] = useState<TypeCommon.PrimaryKey>();

  const { supplierId, products = [] } = form.getFieldsValue();

  const { data, run } = useRequest(async (name: string) => {
    return supplierId ? querySupplierProduct({ supplierId, name }) : [];
  }, { debounceWait: 300, refreshDeps: [supplierId] });

  function onAddProduct(adds: TypeSupplierProduct.DTO[]) {
    const { products = [] } = form.getFieldsValue();
    form.setFieldsValue({ products: filterDuplicatesProduct(adds, products, supplierId) });
  };

  function onRemove(field: FormListFieldData) {
    const { products } = form.getFieldsValue();
    products.splice(field.name, 1);
    form.setFieldsValue({ products });
  };

  function onPreview(field?: FormListFieldData) {
    setProductId(products?.[field?.name!]?.productId);
  };

  function onReset() {
    form.setFieldsValue({ products: [] });
  };

  function validator(rule: RuleObject, value: []) {
    const length = !value?.length;
    length && message.warning('订单产品列表不得为空');
    return length ? Promise.reject() : Promise.resolve();
  };

  const columns = [
    {
      title: '产品名称',
      render: (field: FormListFieldData) => <>
        <FormHideKey name={[field.name, 'id']} />
        <FormHideKey name={[field.name, 'supplierId']} />
        <Form.Item name={[field.name, 'name']}>
          <ReadOnlytext title='预览' onClick={() => onPreview(field)} />
        </Form.Item>
      </>
    },
    {
      title: '品牌',
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'brand']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
    {
      title: '当前库存',
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'surplus']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
    {
      title: '单位',
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'unit']}>
          <ReadOnlytext />
        </Form.Item>
      )
    },
    {
      title: '规格',
      width: 200,
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'specId']} rules={rules}>
          <Select
            showSearch
            allowClear
            disabled={editStatus}
            placeholder='请选择采购规格'
            optionFilterProp="children"
            filterOption={filterOptionTooltip}>
            {products[field.name]?.spec?.map(v => <Option key={v.id} value={v.id} >
              <Tooltip title={v.remark} destroyTooltipOnHide={selectShow}>
                <p>{v.name}</p>
              </Tooltip>
            </Option>)}
          </Select>
        </Form.Item>
      )
    },
    {
      title: '采购量',
      width: 140,
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'quantity']} rules={rules}>
          <InputNumber placeholder='仅数字' min={1} disabled={editStatus} />
        </Form.Item>
      )
    },
    {
      title: '采购单价(元)',
      width: 140,
      render: (field: FormListFieldData) => (
        <Form.Item name={[field.name, 'unitPrice']} rules={rules}>
          <InputNumber money placeholder='元' min={0.01} disabled={editStatus} />
        </Form.Item>
      )
    },
    {
      title: '操作',
      width: 80,
      render: (field: FormListFieldData) => (
        <Btn confirmTips onClick={() => onRemove(field)} type='danger'>删除</Btn>
      )
    }
  ];

  useEffect(() => {
    supplierId && RefQuery.current(undefined);
  }, [supplierId, RefQuery]);

  return (
    <Card title='产品列表' extra={
      <QueryProduct
        list={data}
        ref={RefQuery}
        onCreate={run}
        onReset={onReset}
        onChange={onAddProduct}
        disabled={Boolean(supplierId)} />
    }>
      <ProductDetails id={productId} onClose={onPreview} />
      <Form.List name='products' rules={[{ validator }]}>
        {(fields) => <Table
          rowKey='name'
          columns={columns}
          pagination={false}
          dataSource={fields}
          className={styles.table} />}
      </Form.List>
      <Statistics />
    </Card>
  );
};

export default SupplierProduct;
