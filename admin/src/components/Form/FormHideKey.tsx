import { Form, Input } from 'antd';

import { DB_PRIMARY_KEY } from '@/config/db';

interface TypeFormHideKeyProps {
  name?: string;
  initialValue?: unknown;
}

/**
 * @name FormHideKey Form组件 隐藏字段
 */
const FormHideKey: React.FC<TypeFormHideKeyProps> = ({ name = DB_PRIMARY_KEY, initialValue }) => (
  <Form.Item
    className='none'
    initialValue={initialValue}
    name={name}>
    <Input />
  </Form.Item>
);

export default FormHideKey;
