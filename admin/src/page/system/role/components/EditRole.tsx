import { Modal, Form, Input, Radio } from 'antd';

import { ENUM_ADMIN_SYSTEM } from '@/enum/system';

import type { TypeSystemRole } from '@/interface/system/role';

interface EditRoleProps {
  /**
   * @name visible 是否开启编辑弹窗
   */
  visible: boolean;
  /**
   * @name onClose 开启、关闭弹窗回调方法
   */
  onClose(): void;
}

const rules = [{ required: true, message: '选项不得为空' }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditRole 编辑、新增角色
 */
const EditRole: React.FC<EditRoleProps> = ({
  visible,
  onClose
}) => {

  // 这里表单的values泛类定义是带有欺骗性的interface
  const [form] = Form.useForm<TypeSystemRole.EditRoleParam>();

  async function onSumbit() {
    const values = await form.validateFields();
    console.log('@values', values);
  }

  function onCancel() {
    onClose();
  }

  return (
    <Modal
      title='编辑角色'
      onOk={onSumbit}
      visible={visible}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <Form.Item
          name='name'
          label='角色名称'
          rules={rules}>
          <Input placeholder='请输入角色名称' allowClear />
        </Form.Item>

        <Form.Item
          rules={rules}
          name='status'
          label='角色状态'
          initialValue={ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN}>
          <Radio.Group>
            <Radio value={ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN}>激活</Radio>
            <Radio value={ENUM_ADMIN_SYSTEM.ROLE_STATUS.FREEZE}>冻结</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='简介' name='description'>
          <Input.TextArea placeholder='请输入角色简介' allowClear />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditRole;
