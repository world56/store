import Uploads from '../Uploads';
import { useEffect } from 'react';
import Modal from '@/layout/Modal';
import { FormHideKey } from '../Form';
import { encryption } from '@/utils/crypto';
import { CONSTANT_REG } from '@/constant/reg';
import { Switch } from '@/components/Formatting';
import { checkAdminUserField } from '@/api/system';
import { register, getPubilcKey } from '@/api/auth';
import { Form, Input, Select, message } from 'antd';
import { useActions, useGetDetails, useStore } from '@/hooks';
import { addAdminUser, updateAdminUser, getAdminUserInfo } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_SYSTEM } from '@/enum/system';
import { DB_PRIMARY_KEY } from '@/config/db';
import { ENUM_STORE_ACTION } from '@/enum/store';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemUser } from '@/interface/system/user';

export const UserTextRule = {
  message: '只允许包含数字、字母、下划线',
  pattern: CONSTANT_REG.NUMBER_LETTER,
};

const { Option } = Select;
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/** @param id 传入ID则是编辑模式 (编辑模式：隐藏密码输入框、且无法变更账号)  */
interface TypeEditUserInfoProps extends Partial<TypeCommon.DatabaseMainParameter> {
  /** @param type 编辑用户类型 */
  type: ENUM_SYSTEM.EDIT_USER;
  /** @param visible 开启、编辑弹窗 */
  visible: boolean;
  /** @name onClose 开启、关闭弹窗回调方法 */
  onClose(): void;
};

/**
 * @name EditUserInfo 编辑新增用户基本信息
 */
const EditUserInfo: React.FC<TypeEditUserInfoProps> = ({ id, type, visible, onClose }) => {

  const edit = Boolean(id);
  const isSuperAdmin = type === ENUM_SYSTEM.EDIT_USER.SUPER; // 超管
  const isPersonal = type === ENUM_SYSTEM.EDIT_USER.PERSONAL;

  const [form] = Form.useForm<TypeSystemUser.DTO>();

  const actions = useActions();
  const { user, dictionaries: { DEPARTMENT, ROLE } } = useStore();

  const { loading } = useGetDetails(async () => {
    const data = await getAdminUserInfo({ id: id! });
    data && form.setFieldsValue(data);
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) {
      await updateAdminUser(values);
    } else {
      const key = await getPubilcKey();
      values.password = encryption(key, values.password);
      const request = isSuperAdmin ? register : addAdminUser;
      await request(values);
    }
    message.success('操作成功');
    onClose();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  // 如果是注册超级用户 则在注册时统一校验
  async function checkFields(field: keyof TypeSystemUser.DTO, value: string) {
    const bol = await checkAdminUserField({ [DB_PRIMARY_KEY]: id, [field]: value });
    return bol ? Promise.reject('该字符已被占用，请更换后重试') : bol;
  };

  useEffect(() => {
    if (visible && !isSuperAdmin) {
      actions.getDictionaries(ENUM_STORE_ACTION.DICTIONARIES.ROLE);
      actions.getDictionaries(ENUM_STORE_ACTION.DICTIONARIES.DEPARTMENT);
    }
  }, [visible, isSuperAdmin, actions]);

  return (
    <Modal
      onOk={onSumbit}
      visible={visible}
      loading={loading}
      onCancel={onCancel}
      title={isSuperAdmin ? '注册超级管理员' : id ? isPersonal ? '编辑个人信息' : '编辑用户' : '新增用户'}>

      <Form form={form} {...formStyle}>

        <FormHideKey />

        <Form.Item name='avatar' noStyle>
          <Uploads.Avatar />
        </Form.Item>

        {isSuperAdmin ? <Form.Item name='isSuper' noStyle initialValue={ENUM_SYSTEM.SUPER_ADMIN.SUPER}>
          <Input className='none' />
        </Form.Item> : null}

        <Form.Item
          label='登录账号'
          name='account'
          rules={[
            { required: true, message: '请输入登录账号' },
            UserTextRule,
            { validator: async (r, v: string) => isSuperAdmin || checkFields('account', v) }
          ]}>
          <Input disabled={edit} placeholder='请输入账号(仅支持数字、字母、下划线)' allowClear />
        </Form.Item>

        {edit ? null : <Form.Item
          label='登录密码'
          name='password'
          rules={[{ required: true, message: '请输入登录密码' }, UserTextRule]}>
          <Input.Password placeholder='请输入密码(仅支持数字、字母、下划线)' type='password' allowClear />
        </Form.Item>}

        <Form.Item
          label='用户名称'
          name='name'
          rules={[
            { required: true, min: 2, max: 4, message: '请输入用户昵称' },
            { validator: async (r, v: string) => isSuperAdmin || checkFields('name', v) }
          ]}>
          <Input placeholder='请输入用户名称(2-4个字符)' allowClear />
        </Form.Item>

        <Form.Item
          label='联系电话'
          name='phone'
          rules={[
            { required: true, message: '请输入登录密码' },
            { message: '仅支持11位手机号', pattern: CONSTANT_REG.PHONE_NUMBER },
            { validator: async (r, v: string) => isSuperAdmin || checkFields('phone', v) }
          ]}>
          <Input placeholder='请输入11位电话号码' allowClear />
        </Form.Item>

        <Form.Item
          label='电子邮箱'
          name='email'
          rules={[
            { message: '仅支持常规邮箱', pattern: CONSTANT_REG.E_MAIL },
            { validator: async (r, v: string) => isSuperAdmin || checkFields('email', v) }
          ]}>
          <Input placeholder='请输入电子邮箱地址' allowClear />
        </Form.Item>

        {(!isSuperAdmin && !user.isSuper) ? <>
          <Form.Item name='roles' label='所属角色'>
            <Select
              allowClear
              mode="multiple"
              placeholder="请选择用户角色（多选）">
              {ROLE?.LIST?.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item name='deps' label='所属部门'>
            <Select
              allowClear
              mode="multiple"
              placeholder="请选择用户所属部门（多选）">
              {DEPARTMENT?.LIST?.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item name='status' label='用户状态' initialValue={ENUM_COMMON.STATUS.ACTIVATE}>
            <Switch />
          </Form.Item>

          <Form.Item name='remark' label='备注'>
            <Input.TextArea placeholder='请输入备注' />
          </Form.Item>
        </> : null}

      </Form>
    </Modal>
  );
}

export default EditUserInfo;
