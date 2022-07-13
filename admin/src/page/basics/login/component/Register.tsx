import { useState } from 'react';
import { Button, message } from 'antd';
import { superAdminStatus } from '@/api/auth';
import EditUserInfo from '@/components/EditUserInfo';

import { ENUM_SYSTEM } from '@/enum/system';

const registerText = '超级管理员账号已经被注册，注册新的员工账号请联系管理员';

/**
 * @name Register 注册
 */
const Register = () => {

  const [window, setWindow] = useState(false);

  async function openRegister() {
    const bol = await superAdminStatus();
    if (bol) message.warning(registerText);
    else setWindow(true);
  };

  function onCancel() {
    setWindow(false);
  };

  return (
    <>
      <Button onClick={openRegister} type="dashed">注册超级管理员</Button>
      <EditUserInfo onClose={onCancel} visible={window} type={ENUM_SYSTEM.EDIT_USER.SUPER} />
    </>
  );
};

export default Register;