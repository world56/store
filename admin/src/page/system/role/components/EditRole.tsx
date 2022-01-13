import { memo } from 'react';
import Modal from '@/layout/Modal';
import { useGetDetails } from '@/hooks';
import { Form, Input, message } from 'antd';
import { FormMajorKey } from '@/components/Form';
import { getPermissionTree } from '@/api/system';
import { Switch, Tree } from '@/components/Formatting';
import { addRole, updateRole, checkRoleField, getRoleDetails } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_REG } from '@/constant/reg';
import { CONFIG_ANTD_COMP } from '@/config/format';

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

  const [form] = Form.useForm<TypeSystemRole.Info>();

  const {
    value: permissionTree,
    loading: treeLoad
  } = useGetDetails(async () => {
    return visible ? await getPermissionTree({ tree: true }) : [];
  }, [visible]);

  const { loading } = useGetDetails(async () => {
    const info = await getRoleDetails({ _id: id! });
    info && form.setFieldsValue(info);
  }, [id && treeLoad]);

  async function onSumbit() {
    const values = await form.validateFields();
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
    const bol = await checkRoleField({ [DB_PRIMARY_KEY]: id, name });
    return bol ? bol : Promise.reject('该字符已被占用，请更换后重试');
  };

  const title = id ? '编辑角色' : '新增角色';

  return (
    <Modal
      title={title}
      onOk={onSumbit}
      visible={visible}
      loading={loading}
      forceRender
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <FormMajorKey />

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

        <Form.Item label='权限分配' name='permission'>
          <Tree treeData={permissionTree as []} fieldNames={CONFIG_ANTD_COMP.TREE_FIELD_PERMISSION} />
        </Form.Item>

      </Form>

    </Modal>
  );
};

export default memo(EditRole);

