import { Form, Input } from 'antd';

import { DB_PRIMARY_KEY } from '@/config/db';

interface TypeFormHideKeyProps {
  /** @param name Form.Item name */
  name?: string;
  /** @param initialValue 初始化默认值 */
  initialValue?: unknown;
}

/**
 * @name FormHideKey Form组件 隐藏字段
 */
const FormHideKey: React.FC<TypeFormHideKeyProps> = ({ name = DB_PRIMARY_KEY, initialValue }) => (
  <Form.Item
    hidden
    className='none'
    initialValue={initialValue}
    name={name}>
    <Input />
  </Form.Item>
);

export default FormHideKey;
