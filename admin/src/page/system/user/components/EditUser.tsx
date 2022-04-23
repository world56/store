import { memo } from 'react';
import Modal from '@/layout/Modal';
import { Switch } from '@/components/Formatting';
import { useGetDetails, useStore } from '@/hooks';
import { Form, Input, Select, message } from 'antd';
import { FormMajorKey, FormEditUserInfo } from '@/components/Form';
import { addAdminUser, updateAdminUser, getAdminUserInfo } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemUser } from '@/interface/system/user';
import { getPubilcKey } from '@/api/auth';
import { encryption } from '@/utils/crypto';

const { Option } = Select;

/** @param id 角色ID */
export interface TypeEditUserPorps extends Partial<TypeCommon.DatabaseMainParameter> {
  /** @param visible 是否开启编辑弹窗 */
  visible: boolean;
  /** @name onClose 开启、关闭弹窗回调方法 */
  onClose(): void;
};

// const rules = [{ required: true, message: '选项不得为空' }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditUser 新增、编辑用户
 */
const EditUser: React.FC<TypeEditUserPorps> = ({
  id,
  visible,
  onClose
}) => {
  const [form] = Form.useForm<TypeSystemUser.DTO>();

  const { dictionary: { DEPARTMENT, ROLE } } = useStore();

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
      await addAdminUser(values);
    }
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='编辑用户'
      onOk={onSumbit}
      visible={visible}
      loading={loading}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <FormMajorKey />

        <FormEditUserInfo id={id} />

        <Form.Item name='roles' label='所属角色'>
          <Select
            allowClear
            mode="multiple"
            placeholder="请选择用户角色（多选）">
            {ROLE?.list?.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item name='deps' label='所属部门'>
          <Select
            allowClear
            mode="multiple"
            placeholder="请选择用户所属部门（多选）">
            {DEPARTMENT?.list?.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item name='status' label='用户状态' initialValue={ENUM_COMMON.STATUS.ACTIVATE}>
          <Switch />
        </Form.Item>

        <Form.Item name='remark' label='备注'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default memo(EditUser);
