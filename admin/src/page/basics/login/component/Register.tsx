import { useState } from 'react';
import styles from '../index.styl';
import { encryption } from "@/utils/crypto";
import { superAdminStatus } from '@/api/auth';
import { Button, Modal, Form, message } from 'antd';
import { register, getPubilcKey } from '@/api/auth';
import { FormEditUserInfo } from '@/components/Form';

import type { TypeSystemUser } from '@/interface/system/user';

const formLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 19 } },
};

const registerText = '超级管理员账号已经被注册，注册新的员工账号请联系管理员';

/**
 * @name Register 注册
 */
const Register = () => {

  const [form] = Form.useForm<TypeSystemUser.Register>();

  const [window, setWindow] = useState(false);

  async function onSumbit() {
    const values = await form.validateFields();
    const key = await getPubilcKey();
    values.password = encryption(key, values.password);
    await register(values);
    message.success('注册成功');
    onCancel();
  };

  async function openRegister() {
    const bol = await superAdminStatus();
    if (bol) message.warning(registerText);
    else setWindow(true);
  }

  function onCancel() {
    form.resetFields();
    setWindow(false);
  };

  return (
    <>
      <Button onClick={openRegister} type="dashed">注册超级管理员</Button>
      <Modal
        okText='注册'
        onOk={onSumbit}
        visible={window}
        onCancel={onCancel}
        title='注册超级管理员'
        className={styles.register}>
        <Form form={form} {...formLayout}>
          <FormEditUserInfo isSuper />
        </Form>
      </Modal>
    </>
  );
};

export default Register;