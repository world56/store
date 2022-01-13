import styles from '../index.styl';
import { encryption } from "@/utils/crypto";
import { Modal, Form, message } from 'antd';
import { register, getPubilcKey } from '@/api/auth';
import { FormEditUserInfo } from '@/components/Form';

import type { TypeSystemUser } from '@/interface/system/user';

interface RegisterProps {
  window: boolean;
  onClose(): void;
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

  const [form] = Form.useForm<TypeSystemUser.RegisterUser>();

  async function onSumbit() {
    const values = await form.validateFields();
    const key = await getPubilcKey();
    const userInfo = encryption(key, JSON.stringify(values));
    await register(userInfo);
    message.success('注册成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      okText='注册'
      onOk={onSumbit}
      title='注册超级管理员'
      visible={window}
      onCancel={onCancel}
      className={styles.register}>
      <Form form={form} {...formLayout}>
        <FormEditUserInfo />
      </Form>
    </Modal>
  );
};

export default Register;