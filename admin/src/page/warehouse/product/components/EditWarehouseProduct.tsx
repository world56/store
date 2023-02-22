import { useCategorys } from '@/hooks';
import styles from '../index.module.sass';
import Uploads from '@/components/Uploads';
import Categorys from '@/components/Categorys';
import { Drawer, Form, Input, InputNumber, Select, Button } from "antd";

import { ENUM_STORE } from '@/enum/store';

import type { TypeCommon } from '@/interface/common';
import type { TypeWarehouseProduct } from "@/interface/warehouse/product";

export interface TypeEditWarehouseProductProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
};

const { ENUM_CATEGORY } = useCategorys;

const { Option } = Select;
const rules = [{ required: true }];

/**
 * @name EditWarehouseProduct 编辑仓库产品（新增、编辑）
 */
const EditWarehouseProduct: React.FC<TypeEditWarehouseProductProps> = ({ id, visible }) => {

  const category = useCategorys([
    ENUM_CATEGORY.WAREHOUSE_UNIT,
    ENUM_CATEGORY.WAREHOUSE_POSITION,
    ENUM_CATEGORY.WAREHOUSE_PRODUCT_TYPE,
  ]);

  const [form] = Form.useForm<TypeWarehouseProduct.DTO>();

  async function onSubmit() {
    const value = await form.validateFields();
    console.log(value);
  };

  return (
    <Drawer
      open={visible}
      title='编辑仓库产品状态'
      className={styles.edit}
      footer={[
        <Button key='1' onClick={onSubmit}>取消</Button>,
        <Button key='2' type='primary' onClick={onSubmit}>提交</Button>,
      ]}>
      <Form form={form} layout='vertical'>

        <Form.Item label='产品名称' name='name' rules={rules}>
          <Input placeholder='请输入产品名称' allowClear />
        </Form.Item>

        <Form.Item
          label={<>
            <span>计量单位</span>
            <Categorys type={ENUM_STORE.CATEGORY.WAREHOUSE_UNIT} />
          </>}
          name='unit'
          rules={rules}>
          <Categorys.Select type={ENUM_STORE.CATEGORY.WAREHOUSE_UNIT} />
        </Form.Item>

        <Form.Item
          label={<>
            <span>产品类型</span>
            <Categorys type={ENUM_STORE.CATEGORY.WAREHOUSE_PRODUCT_TYPE} />
          </>} name='type' rules={rules}>
          <Categorys.Select type={ENUM_STORE.CATEGORY.WAREHOUSE_PRODUCT_TYPE} />
        </Form.Item>

        <Form.Item label='存放仓位' name='positionId' rules={rules}>
          <Select
            allowClear
            mode="multiple"
            placeholder='请选择存放仓位'>
            {category?.WAREHOUSE_POSITION?.LIST?.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label='产品数量' name='count' rules={rules}>
          <InputNumber placeholder='请输入产品数量' min={0} />
        </Form.Item>

        <Form.Item label='阈值存量' name='alertQuantity' tooltip='达到最低阈值将进行提示'>
          <InputNumber placeholder='请输入阈值存量（为空则不监控库存剩余存量）' min={0} />
        </Form.Item>

        <Form.Item label='注意事项' name='remark'>
          <Input.TextArea rows={4} placeholder='清输入注意事项（选填）' allowClear />
        </Form.Item>

        <Form.Item label='其他附件' name='files'>
          <Uploads />
        </Form.Item>

      </Form>
    </Drawer>
  );
};

export default EditWarehouseProduct;
