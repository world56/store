import { memo } from 'react';
import Modal from '@/layout/Modal';
import { FormHideKey } from "@/components/Form";
import { Form, Input, message, Select } from "antd";
import { useActions, useGetDetails, useStore } from "@/hooks";
import { checkDepartmentField, getDepartmentDetails, insertDepartment, updateDepartment } from "@/api/system";

import { DB_PRIMARY_KEY } from '@/config/db';
import { ENUM_STORE_ACTION } from '@/enum/store';

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
  const { dictionaries } = useStore();
  const [form] = Form.useForm<TypeSystemDepartment.DTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getDepartmentDetails({ id: id! });
    data && form.setFieldsValue(data);
  }, [id, form]);

  useGetDetails(async () => {
    return actions.getDictionaries(ENUM_STORE_ACTION.DICTIONARIES.ADMIN_USER);
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

  async function checkField(field: 'name', value: string) {
    const bol = await checkDepartmentField({ [DB_PRIMARY_KEY]: id!, [field]: value });
    return bol ? Promise.reject('该字符已被占用，请更换后重试') : bol;
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

        <Form.Item
          name='name'
          label='部门名称'
          rules={[
            { required: true, message: '部门名称不得为空' },
            { validator: async (r, v: string) => checkField('name', v) }
          ]}>
          <Input placeholder='请输入部门名称' allowClear />
        </Form.Item>

        <Form.Item name='users' label='部门用户'>
          <Select
            allowClear
            mode="multiple"
            placeholder="请选择部门用户（多选）">
            {dictionaries.ADMIN_USER?.LIST?.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
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
