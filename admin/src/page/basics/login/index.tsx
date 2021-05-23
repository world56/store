import Hint from './component/Hint';
import { useActions } from '@/hooks';
import { Form, Input, Button } from 'antd';
import Container from './component/Container';
import { userLogin } from '@/store/distributed/user';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import type * as UserType from '@/interface/user';

/**
 * @name Login 登录页
 */
const Login = () => {

  const actions = useActions({ userLogin });

  const [form] = Form.useForm<UserType.Login.AccountSecret>();

  async function onSumbit() {
    const values = await form.validateFields();
    actions.userLogin(values);
  };

  return (
    <Container>
      <Form name='@Ming' form={form}>
        <Hint />
        <Form.Item name="account" rules={[{ required: true, message: '账号不得为空' }]}>
          <Input placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '密码不得为空' }]}>
          <Input type='password' placeholder='请输入密码' prefix={<LockOutlined />} />
        </Form.Item>
        <Button onClick={onSumbit} type='primary'>登录</Button>
      </Form>
    </Container>
  );
};

export default Login;
