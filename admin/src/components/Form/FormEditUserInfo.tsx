import { Form, Input } from 'antd';
import { CONSTANT_REG } from '@/constant/reg';
import { checkAdminUserField } from '@/api/system';

import { DB_PRIMARY_KEY } from '@/config/db';

import type { TypeSystemUser } from '@/interface/system/user';

export const UserTextRule = {
  message: '只允许包含数字、字母、下划线',
  pattern: CONSTANT_REG.NUMBER_LETTER,
};

interface TypeFormEditUserInfoProps {
  /** @param id 传入ID则是编辑模式 (编辑模式：隐藏密码输入框、且无法变更账号)  */
  id?: string;
};

/**
 * @name FormEditUserInfo Form组件 用户基本信息编辑
 */
const FormEditUserInfo: React.FC<TypeFormEditUserInfoProps> = ({ id }) => {

  const edit = Boolean(id);

  async function checkFields(field: keyof TypeSystemUser.Info, value: string) {
    const bol = await checkAdminUserField({ [DB_PRIMARY_KEY]: id, [field]: value });
    return bol ? bol : Promise.reject('该字符已被占用，请更换后重试');
  };

  return (
    <>
      <Form.Item
        label='登录账号'
        name='account'
        rules={[
          { required: true, message: '请输入登录账号' },
          UserTextRule,
          { validator: async (r, v: string) => checkFields('account', v) }
        ]}>
        <Input disabled={edit} placeholder='请输入账号(仅支持数字、字母、下划线)' allowClear />
      </Form.Item>

      {edit ? null : <Form.Item
        label='登录密码'
        name='password'
        rules={[
          { required: true, message: '请输入登录密码' }, UserTextRule]}>
        <Input.Password placeholder='请输入密码(仅支持数字、字母、下划线)' type='password' allowClear />
      </Form.Item>}

      <Form.Item
        label='用户名称'
        name='name'
        rules={[
          { required: true, min: 2, max: 4, message: '请输入用户昵称' },
          { validator: async (r, v: string) => checkFields('name', v) }
        ]}>
        <Input placeholder='请输入用户名称(2-4个字符)' allowClear />
      </Form.Item>

      <Form.Item
        label='联系电话'
        name='phone'
        rules={[
          { required: true, message: '请输入登录密码' },
          { message: '仅支持11位手机号', pattern: CONSTANT_REG.PHONE_NUMBER },
          { validator: async (r, v: string) => checkFields('phone', v) }
        ]}>
        <Input placeholder='请输入11位电话号码' allowClear />
      </Form.Item>
    </>
  );
}

export default FormEditUserInfo;
