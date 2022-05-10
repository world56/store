import { memo } from 'react';
import Modal from '@/layout/Modal';
import { useGetDetails } from '@/hooks';
import { Form, Input, message } from 'antd';
import { FormHideKey } from '@/components/Form';
import { Switch, Tree } from '@/components/Formatting';
import { insertRole, updateRole, checkRoleField, getRoleDetails } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONFIG_ANTD_COMP } from '@/config/format';

import type { TypeCommon } from '@/interface/common';
import type { RuleObject } from 'rc-field-form/lib/interface';
import type { TypeSystemRole } from '@/interface/system/role';
import type { TypeSystemPermission } from '@/interface/system/permission';

interface TypeEditRoleProps extends Partial<TypeCommon.DatabaseMainParameter> {
  /** @param visible 是否开启编辑弹窗 */
  visible: boolean;
  /** @name onClose 开启、关闭弹窗回调方法 */
  onClose(): void;
  /** @param permissionTree 权限树🌲 */
  permissionTree?: TypeSystemPermission.DTO[];
}

const rules = [{ required: true, message: '选项不得为空' }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditRole 编辑、新增角色
 */
const EditRole: React.FC<TypeEditRoleProps> = ({
  id,
  onClose,
  visible,
  permissionTree
}) => {

  const [form] = Form.useForm<TypeSystemRole.DTO>();

  const { loading } = useGetDetails(async () => {
    const info = await getRoleDetails({ id: id! });
    info && form.setFieldsValue(info);
  }, [id]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updateRole(values);
    else await insertRole(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    onClose();
    form.resetFields();
  };

  async function validator(rule: RuleObject, name: string | void) {
    const bol = await checkRoleField({ [DB_PRIMARY_KEY]: id, name });
    return bol ? Promise.reject('该字符已被占用，请更换后重试') : bol;
  };

  const title = id ? '编辑角色' : '新增角色';

  return (
    <Modal
      forceRender
      title={title}
      onOk={onSumbit}
      visible={visible}
      loading={loading}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <FormHideKey />

        <Form.Item
          name='name'
          label='角色名称'
          rules={[{ required: true, message: '角色名称不得为空' }, { validator }]}>
          <Input placeholder='请输入角色名称' allowClear />
        </Form.Item>

        <Form.Item
          name='status'
          rules={rules}
          initialValue={ENUM_COMMON.STATUS.ACTIVATE}
          label='角色状态'>
          <Switch />
        </Form.Item>

        <Form.Item label='备注' name='remark'>
          <Input.TextArea placeholder='请输入角色备注' allowClear />
        </Form.Item>

        <Form.Item label='权限分配' name='permissionId'>
          <Tree
            key={permissionTree?.length}
            treeData={permissionTree as []}
            fieldNames={CONFIG_ANTD_COMP.TREE_FIELD_PERMISSION}
          />
        </Form.Item>

      </Form>

    </Modal>
  );
};

export default memo(EditRole);

