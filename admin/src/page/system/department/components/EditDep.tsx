import { memo } from 'react';
import { Modal } from "@/layout/PopUp";
import { Form, Input, message, Select } from "antd";
import { useActions, useGetDetails, useStore } from "@/hooks";
import { FormHideKey, FormValueCheck } from "@/components/Form";
import { checkDepartmentField, getDepartmentDetails, insertDepartment, updateDepartment } from "@/api/system";

import { ENUM_STORE } from '@/enum/store';

import type { TypeCommon } from "@/interface/common";
import type { TypeSystemDepartment } from "@/interface/system/department";


interface TypeEditDepProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
};

const { Option } = Select;
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditDep 编辑部门
 */
const EditDep: React.FC<TypeEditDepProps> = ({ id, visible, onClose }) => {

  const actions = useActions();

  const { category } = useStore();
  const [form] = Form.useForm<TypeSystemDepartment.DTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getDepartmentDetails({ id: id! });
    data && form.setFieldsValue(data);
  }, [id, form]);

  useGetDetails(async () => {
    return actions.getCategory([ENUM_STORE.CATEGORY.ADMIN_USER]);
  }, [visible]);

  async function onSumbit() {
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
      title={title}
      onOk={onSumbit}
      visible={visible}
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
