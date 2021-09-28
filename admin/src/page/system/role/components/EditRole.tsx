import { Modal, Form, Input, Select } from 'antd';

/**
 * @name EditRole 编辑、新增角色
 */
const EditRole: React.FC = () => {

  const [form] = Form.useForm();

  return (
    <Modal title='编辑角色'>
      <Form form={form}>

        <Form.Item label='角色名称' name='name'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>

        <Form.Item label='角色状态' name='status'>
          <Select placeholder='请选择角色状态'>
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditRole;
