import Hint from './component/Hint';
import { useActions } from '@/hooks';
import { Form, Input, Button } from 'antd';
import Register from './component/Register';
import Container from './component/Container';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import type { TypeSystemUser } from '@/interface/system/user';

const Login = () => {

  const actions = useActions();

  const [form] = Form.useForm<TypeSystemUser.Login>();

  async function onSumbit() {
    const values = await form.validateFields();
    actions.userLogin(values);
  };

  return (
    <Container>
      <Form form={form}>
        <Hint />
        <Form.Item name="account" rules={[{ required: true, message: '账号不得为空' }]}>
          <Input onPressEnter={onSumbit} placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '密码不得为空' }]} >
          <Input onPressEnter={onSumbit} type='password' placeholder='请输入密码' prefix={<LockOutlined />} />
        </Form.Item>
        <Register />
        <Button onClick={onSumbit} type='primary'>登录</Button>
      </Form>
    </Container>
  );
};

export default Login;
