import { memo } from 'react';
import { Modal } from "@/layout/PopUp";
import { filterServiceToForm } from '../utils';
import { Form, Input, message, Select } from "antd";
import { useGetDetails, useCategorys } from "@/hooks";
import { FormHideKey, FormValueCheck } from "@/components/Form";
import { checkDepartmentField, getDepartmentDetails, insertDepartment, updateDepartment } from "@/api/system";

import type { TypeCommon } from "@/interface/common";
import type { TypeSystemDepartment } from "@/interface/system/department";

interface TypeEditDepProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
};

const { Option } = Select;
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name EditDep 编辑部门
 */
const EditDep: React.FC<TypeEditDepProps> = ({ id, visible, onClose }) => {

  const category = useCategorys([ENUM_CATEGORY.ADMIN_USER], [visible]);

  const [form] = Form.useForm<TypeSystemDepartment.EditDTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getDepartmentDetails({ id: id! });
    data && form.setFieldsValue(filterServiceToForm(data));
  }, [id, form]);

  async function onSubmit() {
    const values = await form.validateFields();
    if (id) await updateDepartment(values);
    else await insertDepartment(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  const title = id ? '编辑部门' : '新增部门';

  return (
    <Modal
      spacing
      title={title}
      open={visible}
      onOk={onSubmit}
      loading={loading}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <FormHideKey />

        <FormValueCheck
          id={id}
          name='name'
          label='部门名称'
          checkFieldsFn={checkDepartmentField}
        />

        <Form.Item name='users' label='部门用户'>
          <Select
            allowClear
            mode="multiple"
            placeholder="请选择部门用户（多选）">
            {category.ADMIN_USER?.LIST?.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label='备注' name='remark'>
          <Input.TextArea placeholder='请输入部门备注' allowClear />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default memo(EditDep);
