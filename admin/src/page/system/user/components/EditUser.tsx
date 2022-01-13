import { memo } from 'react';
import Modal from '@/layout/Modal';
import { useGetDetails } from '@/hooks';
import { Switch } from '@/components/Formatting';
import { Form, Input, Select, message } from 'antd';
import { FormMajorKey, FormEditUserInfo } from '@/components/Form';
import { addAdminUser, updateAdminUser, getAdminUserInfo, getRoleSelectList } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeSystemUser } from '@/interface/system/user';

const { Option } = Select;

export interface TypeEditUserPorps {
  /** @param id 角色ID */
  id?: string;
  /** @param visible 是否开启编辑弹窗 */
  visible: boolean;
  /** @param onClose 开启、关闭弹窗回调方法 */
  onClose(): void;
};

const rules = [{ required: true, message: '选项不得为空' }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditUser 新增、编辑用户
 */
const EditUser: React.FC<TypeEditUserPorps> = ({
  id,
  visible,
  onClose
}) => {
  const [form] = Form.useForm<TypeSystemUser.Info>();

  const { value: roleList } = useGetDetails(getRoleSelectList, [visible]);

  const { loading } = useGetDetails(async () => {
    const data = await getAdminUserInfo({ _id: id! });
    data && form.setFieldsValue(data);
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updateAdminUser(values);
    else await addAdminUser(values);
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

        <Form.Item name='role' label='所属角色' rules={rules}>
          <Select
            allowClear
            mode="multiple"
            placeholder="请选择用户角色（多选）">
            {roleList?.map(v => <Option key={v._id} value={v._id!}>{v.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          name='status' label='角色状态'
          initialValue={ENUM_COMMON.STATUS.ACTIVATE}>
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
