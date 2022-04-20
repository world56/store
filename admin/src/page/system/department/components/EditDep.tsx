import { Form, Modal, Input } from "antd"
import { FormMajorKey } from "@/components/Form";
import { TypeSystemDepartment } from "@/interface/system/department";

import { type TypeCommon } from "@/interface/common";

interface TypeEditDepProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
}

// const rules = [{ required: true, message: '选项不得为空' }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditDep 编辑部门
 */
const EditDep: React.FC<TypeEditDepProps> = ({ id, visible, onClose }) => {

  const [form] = Form.useForm<TypeSystemDepartment.DTO>()

  async function onSumbit() {
    const values = await form.validateFields();
    console.log(values);
  };

  function onCancel() {
    onClose();
  };

  const title = id ? '编辑部门' : '新增部门';

  return (
    <Modal title={title} visible={visible} onOk={onSumbit} onCancel={onCancel}>
      <Form form={form} {...formStyle}>
        <FormMajorKey />

        {/* <Form.Item
          name='name'
          label='角色名称'
          rules={[{ required: true, message: '角色名称不得为空' }]}>
          <Input placeholder='请输入角色名称' allowClear />
        </Form.Item> */}


      </Form>
    </Modal>
  );
};

export default EditDep;
