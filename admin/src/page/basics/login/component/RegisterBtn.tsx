import { useAsync } from 'react-use';
import { Button, Tooltip } from 'antd';
import { superAdminStatus } from '@/api/auth';

const registerText = '超级管理员账号已经被注册，注册新的员工账号请联系系统管理员';

interface TypeRegisterBtnProps {
  onClick(): void;
};

/**
 * @name RegisterBtn 注册按钮
 * @description 如果已经存在超级管理员则不能点击并提示
 */
const RegisterBtn: React.FC<TypeRegisterBtnProps> = ({ onClick }) => {

  const { loading, value } = useAsync(superAdminStatus);

  const btn = <Button onClick={onClick} disabled={value} loading={loading} type="dashed">注册超级管理员</Button>;

  return value ? <Tooltip title={registerText}>{btn}</Tooltip> : btn;
};

export default RegisterBtn;
