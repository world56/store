import Hint from './component/Hint';
import { useActions } from '@/hooks';
import { Form, Input, Button } from 'antd';
import Register from './component/Register';
import Container from './component/Container';
import { useState, useCallback } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import type { TypeUser } from '@/interface/user';

const Login = () => {

  const actions = useActions();

  const [window, setWindow] = useState(false);

  const [form] = Form.useForm<TypeUser.AccountSecret>();

  async function onSumbit() {
    const values = await form.validateFields();
    actions.userLogin(values);
  };

  const openRegister = useCallback(() => setWindow(b => !b), []);

  return (
    <Container>
      <Form form={form}>
        <Hint />
        <Form.Item name="account" rules={[{ required: true, message: '账号不得为空' }]}>
          <Input placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '密码不得为空' }]} >
          <Input onPressEnter={onSumbit} type='password' placeholder='请输入密码' prefix={<LockOutlined />} />
        </Form.Item>
        <Button onClick={onSumbit} type='primary'>登录</Button>
        <Button onClick={openRegister} type="dashed">快速注册</Button>
      </Form>
      <Register window={window} onClose={openRegister} />
    </Container>
  );
};

export default Login;
