import styles from '../index.styl';
import * as REG from '@/constant/reg';
import { encryption } from "@/utils/crypto";
import { Modal, Form, Input, message } from 'antd';
import { register, getPubilcKey } from '@/api/user';

import type * as UserType from '@/interface/user';

interface RegisterProps {
  window: boolean;
  onClose(): void;
}

const textRule = {
  message: '只允许包含数字、字母、下划线',
  pattern: REG.NUMBER_LETTER,
};

const formLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 19 } },
};

/**
 * @name Register 注册
 */
const Register: React.FC<RegisterProps> = ({
  window,
  onClose
}) => {

  const [form] = Form.useForm<UserType.Login.RegisterUser>();

  async function onSumbit() {
    const values = await form.validateFields();
    const key = await getPubilcKey();
    values.password = encryption(key, values.password);
    await register(values);
    message.success('注册成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  }

  return (
    <Modal
      okText='注册'
      title='注册用户'
      onOk={onSumbit}
      visible={window}
      onCancel={onCancel}
      className={styles.register}>
      <Form form={form} {...formLayout}>
        <Form.Item
          label='登录账号'
          name='account'
          initialValue='admin'
          rules={[{ required: true, message: '请输入登录账号' }, textRule]}>
          <Input placeholder='请输入账号' disabled />
        </Form.Item>

        <Form.Item
          label='登录密码'
          name='password'
          rules={[{ required: true, message: '请输入登录密码' }, textRule]}>
          <Input placeholder='请输入密码' type='password' />
        </Form.Item>

        <Form.Item
          label='用户昵称'
          name='name'
          rules={[{ required: true, min: 2, max: 4, message: '请输入用户昵称(2-4个字符)' }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>

        <Form.Item
          label='联系电话'
          name='phone'
          rules={[
            { required: true, message: '请输入登录密码' },
            { message: '仅支持11位手机号', pattern: REG.PHONE_NUMBER }]}>
          <Input placeholder='请输入11位电话号码' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Register;