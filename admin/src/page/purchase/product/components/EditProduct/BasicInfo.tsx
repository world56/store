import { Form, Input } from "antd";
import Categorys from "@/components/Categorys";
import { Switch } from '@/components/Formatting';
import { FormHideKey, FormValueCheck } from "@/components/Form";

import { ENUM_STORE } from "@/enum/store";
import { ENUM_COMMON } from '@/enum/common';

import type { TypeEditProductProps } from ".";

interface TypeProductBasicInfo extends Pick<TypeEditProductProps, 'id'> { }

/**
 * @name BasicInfo 产品基本信息
 */
const BasicInfo: React.FC<TypeProductBasicInfo> = ({ id }) => (
  <>
    <FormHideKey />

    <FormValueCheck id={id} name='name' label="产品名称" checkFieldsFn={async () => false} />

    <Form.Item
      name='brandId'
      rules={[{ required: true, message: '请选择产品品牌' }]}
      label={<>
        <span>品牌</span>
        <Categorys type={ENUM_STORE.CATEGORY.PRODUCT_BRAND} />
      </>}>
      <Categorys.Select type={ENUM_STORE.CATEGORY.PRODUCT_BRAND} />
    </Form.Item>

    <Form.Item
      name='category'
      rules={[{ required: true, message: '请选择供应商产品类型' }]}
      label={<>
        <span>产品类型</span>
        <Categorys type={ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE} />
      </>}>
      <Categorys.Select mode='multiple' type={ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE} />
    </Form.Item>

    <Form.Item
      name='unit'
      rules={[{ required: true, message: '请选择计量单位类型' }]}
      label={<>
        <span>计量单位</span>
        <Categorys type={ENUM_STORE.CATEGORY.WAREHOUSE_UNIT} />
      </>}>
      <Categorys.Select type={ENUM_STORE.CATEGORY.WAREHOUSE_UNIT} />
    </Form.Item>

    <Form.Item
      label="状态"
      name='status'
      initialValue={ENUM_COMMON.STATUS.ACTIVATE}>
      <Switch />
    </Form.Item>

    <Form.Item name="remark" label="备注">
      <Input.TextArea allowClear placeholder='请输入相关备注（选填）' />
    </Form.Item>

  </>
);

export default BasicInfo;
