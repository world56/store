import { Form, Input } from 'antd';

import { DB_PRIMARY_KEY } from '@/config/db';

/**
 * @name FormMajorKey Form组件 注册数据库主键ID值
 */
const FormMajorKey = () => (
  <Form.Item
    className='none'
    name={DB_PRIMARY_KEY}>
    <Input />
  </Form.Item>
);

export default FormMajorKey;
