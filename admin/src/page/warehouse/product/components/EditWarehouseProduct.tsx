import { useEffect } from 'react';
import styles from './index.styl';
import Uploads from '@/components/Uploads';
import { useActions, useStore } from '@/hooks';
import { Drawer, Form, Input, InputNumber, Select, Button } from "antd";

import { ENUM_STORE_ACTION } from '@/enum/store';

import type { TypeWarehouseProduct } from "@/interface/warehouse/product";
import { TypeCommon } from '@/interface/common';

const { Option } = Select;
const rules = [{ required: true }];

export interface TypeEditWarehouseProductProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
};

/**
 * @name EditWarehouseProduct 编辑仓库产品（新增、编辑）
 */
const EditWarehouseProduct: React.FC<TypeEditWarehouseProductProps> = ({ id, visible }) => {

  const actions = useActions();
  const { dictionaries: { WAREHOUSE_POSITION } } = useStore();

  const [form] = Form.useForm<TypeWarehouseProduct.DTO>();

  async function onSumbit() {
    const value = await form.validateFields();
    console.log(value);
  };

  useEffect(() => {
    actions.getDictionaries(ENUM_STORE_ACTION.DICTIONARIES.WAREHOUSE_POSITION);
  }, [actions, form]);

  return (
    <Drawer title='编辑仓库产品状态' visible className={styles.edit} footer={[
      <Button key='1' onClick={onSumbit}>提交</Button>
    ]}>
      <Form form={form} layout='vertical'>

        <Form.Item label='产品名称' name='name' rules={rules}>
          <Input placeholder='请输入产品名称' allowClear />
        </Form.Item>

        <Form.Item label='存放仓位' name='positionId' rules={rules}>
          <Select
            allowClear
            mode="multiple"
            placeholder='请选择存放仓位'>
            {WAREHOUSE_POSITION?.LIST.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label='产品数量（个）' name='count' rules={rules}>
          <InputNumber placeholder='请输入产品数量' min={0} />
        </Form.Item>

        <Form.Item label='阈值存量（个）' name='alertQuantity'>
          <InputNumber placeholder='请输入阈值存量（为0则不监控库存剩余存量）' min={0} />
        </Form.Item>

        <Form.Item label='备注' name='remark'>
          <Input.TextArea allowClear placeholder='清输入备注（选填）' />
        </Form.Item>

        <Form.Item label='附件' name='files'>
          <Uploads />
        </Form.Item>

      </Form>
    </Drawer>
  );
};

export default EditWarehouseProduct;
