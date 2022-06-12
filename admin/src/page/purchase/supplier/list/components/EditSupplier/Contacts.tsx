import { rules } from '.';
import Card from '@/layout/Card';
import { Form, Input } from 'antd';
import { formNestedFields } from '@/utils';

import type { FormListFieldData } from 'antd/es/form/FormList';

interface TypeFormContactsProps {
  itemProps: FormListFieldData;
  remove?(): void;
};

/**
 * @name Contacts 供应商联系方式
 */
const Contacts: React.FC<TypeFormContactsProps> = ({ itemProps, remove }) => (
  <Card title={`联系方式（${itemProps.key + 1}）`} remove={remove}>

    <Form.Item label='联系人' {...formNestedFields(itemProps, 'name')} rules={rules}>
      <Input placeholder='请输入供应商联系人名称' allowClear />
    </Form.Item>

    <Form.Item label='联系电话' {...formNestedFields(itemProps, 'phone')} rules={rules}>
      <Input placeholder='请输入联系电话号码' allowClear />
    </Form.Item>

    <Form.Item label='备注' {...formNestedFields(itemProps, 'remark')}>
      <Input.TextArea placeholder='请输入备注' allowClear />
    </Form.Item>

  </Card>
);

export default Contacts;
