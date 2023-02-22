import { useEffect } from 'react';
import Hint from './component/Hint';
import { Form, Input, Button } from 'antd';
import Register from './component/Register';
import Container from './component/Container';
import { useActions, useStore } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import type { TypeAdminUser } from '@/interface/system/user';

const Login = () => {

  const { user } = useStore();
  const actions = useActions();
  const navigate = useNavigate();

  const [form] = Form.useForm<TypeAdminUser.Login>();

  async function onSubmit() {
    const values = await form.validateFields();
    actions.userLogin(values);
  };

  useEffect(() => {
    user.id && navigate('/', { replace: true });
  }, [user, navigate]);

  return (
    <Container>
      <Form form={form}>
        <Hint />
        <Form.Item name="account" rules={[{ required: true, message: '账号不得为空' }]}>
          <Input onPressEnter={onSubmit} placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '密码不得为空' }]} >
          <Input onPressEnter={onSubmit} type='password' placeholder='请输入密码' prefix={<LockOutlined />} />
        </Form.Item>
        <Register />
        <Button onClick={onSubmit} type='primary'>登录</Button>
      </Form>
    </Container>
  );
};

export default Login;
