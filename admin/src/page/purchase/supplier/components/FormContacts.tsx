import Card from '@/layout/Card';
import { Form, Input } from 'antd';
import { rules } from './EditSupplier';

import type { FormListFieldData } from 'antd/es/form/FormList';

interface TypeFormContactsProps {
  itemProps: FormListFieldData;
  remove?(): void;
};

/**
 * @name FormContacts 供应商联系方式
 */
const FormContacts: React.FC<TypeFormContactsProps> = ({ itemProps, remove }) => {

  function createField(name: string) {
    return {
      name: itemProps ? [itemProps.name, name] : name,
      fieldKey: itemProps ? [itemProps.key, name] : name,
    };
  };

  return (
    <Card title={`联系方式（${itemProps.key + 1}）`} remove={remove}>

      <Form.Item label='联系人' {...createField('name')} rules={rules}>
        <Input placeholder='请输入供应商联系人名称' allowClear />
      </Form.Item>

      <Form.Item label='联系电话' {...createField('phone')} rules={rules}>
        <Input placeholder='请输入联系电话号码' allowClear />
      </Form.Item>

      <Form.Item label='地址' {...createField('address')}>
        <Input placeholder='请输入地址' allowClear />
      </Form.Item>

      <Form.Item label='备注' {...createField('remark')}>
        <Input.TextArea placeholder='请输入备注' allowClear />
      </Form.Item>

    </Card>
  );
};

export default FormContacts;
