import { Switch } from '@/components/Formatting';
import { Form, Spin, Modal, Input, message } from 'antd';
import { memo, useState, useEffect, useCallback } from 'react';
import { addRole, updateRole, checkRoleField, getRoleDetails } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_REG } from '@/constant/reg';

import type { RuleObject } from 'rc-field-form/lib/interface';
import type { TypeSystemRole } from '@/interface/system/role';

interface EditRoleProps {
  /** @param id 角色ID */
  id?: string;
  /** @param visible 是否开启编辑弹窗 */
  visible: boolean;
  /** @param onClose 开启、关闭弹窗回调方法 */
  onClose(): void;
}

const rules = [{ required: true, message: '选项不得为空' }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditRole 编辑、新增角色
 */
const EditRole: React.FC<EditRoleProps> = ({
  id,
  onClose,
  visible,
}) => {

  const [load, setLoad] = useState(false);
  const [form] = Form.useForm<TypeSystemRole.EditRoleParam>();

  const init = useCallback(async (_id: string) => {
    try {
      setLoad(b => !b);
      const info = await getRoleDetails({ _id });
      form.setFieldsValue(info);
    } finally {
      setLoad(b => !b);
    };
  }, [form]);

  async function onSumbit() {
    const values = await form.validateFields();
    const id = values[DB_PRIMARY_KEY];
    if (id) await updateRole(values);
    else await addRole(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    onClose();
    form.resetFields();
  };

  async function validator(rule: RuleObject, name: string | void) {
    try {
      return await checkRoleField({ [DB_PRIMARY_KEY]: id, name });
    } catch (error) {
      return Promise.reject('不是有效的角色名称,请尝试重新输入');
    }
  };

  useEffect(() => {
    id && init(id);
  }, [id, init]);

  return (
    <Modal
      onOk={onSumbit}
      visible={visible}
      onCancel={onCancel}
      title={id ? '编辑角色' : '新增角色'}>
      <Spin spinning={load}>

        <Form form={form} {...formStyle}>

          <Form.Item
            className='none'
            name={DB_PRIMARY_KEY}>
            <Input />
          </Form.Item>

          <Form.Item
            name='name'
            label='角色名称'
            rules={[{
              required: true,
              pattern: CONSTANT_REG.CN,
              message: '角色名称不得为空，且仅支持中文输入'
            }, { validator }]}>
            <Input placeholder='请输入角色名称' allowClear />
          </Form.Item>

          <Form.Item
            name='status'
            rules={rules}
            initialValue={ENUM_COMMON.STATUS.ACTIVATE}
            label='角色状态'>
            <Switch />
          </Form.Item>

          <Form.Item label='简介' name='description'>
            <Input.TextArea placeholder='请输入角色简介' allowClear />
          </Form.Item>

        </Form>
      </Spin>
    </Modal>
  );
};

export default memo(EditRole);
