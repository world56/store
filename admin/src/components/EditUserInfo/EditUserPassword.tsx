import { UserTextRule } from '.';
import { useStore } from '@/hooks';
import { encryption } from '@/utils';
import { FormHideKey } from '../Form';
import { Form, Input, message, Modal } from "antd";
import { getPubilcKey, updateUserPwd } from '@/api/auth';

import type { TypeAdminUser } from "@/interface/system/user";

interface TypeEditUserPasswordProps {
  /** @param visible 开启修改密码弹窗 */
  visible: boolean;
  /** @name onClose 关闭窗口 */
  onClose(): void;
}

/**
 * @name EditUserPassword 修改用户密码
 */
const EditUserPassword: React.FC<TypeEditUserPasswordProps> = ({ visible, onClose }) => {

  const { user } = useStore();

  const [form] = Form.useForm<TypeAdminUser.EditUserPassword>();

  async function onSumbit() {
    const values = await form.validateFields();
    const key = await getPubilcKey();
    values.password = encryption(key, values.password);
    values.newPassword = encryption(key, values.newPassword);
    await updateUserPwd(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  return (
    <Modal title='修改密码' open={visible} onOk={onSumbit} onCancel={onCancel}>
      <Form form={form}>

        <FormHideKey initialValue={user.id} />

        <Form.Item
          label='旧密码'
          name='password'
          rules={[{ required: true, message: '请输入登录旧密码' }, UserTextRule]}>
          <Input.Password placeholder="请输入登录旧密码" allowClear />
        </Form.Item>
        <Form.Item
          label='新密码'
          name='newPassword'
          rules={[{ required: true, message: '请输入新的登录密码' }, UserTextRule]}>
          <Input.Password placeholder="请输入新的登录密码" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserPassword;
