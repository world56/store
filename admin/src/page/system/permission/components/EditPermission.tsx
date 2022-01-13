import {
  addPermission,
  updatePermission,
  getPermissionTree,
  getPermissionDetails,
  checkPermissionField
} from '@/api/system';
import { memo } from 'react';
import Modal from '@/layout/Modal';
import { useGetDetails } from '@/hooks';
import { FormMajorKey } from '@/components/Form';
import { Switch } from '@/components/Formatting';
import FormItemLocation from './FormItemLocation';
import { Form, Input, Radio, message } from 'antd';

import { ENUM_SYSTEM } from '@/enum/system';
import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_REG } from '@/constant/reg';
import { CONSTANT_SYSTEM } from '@/constant/system';

import type { TypeSystemPermission } from '@/interface/system/permission';

export interface EditPermissionProps {
  /** @param id 查询ID */
  id?: string;
  /** @param visible 控制开启、关闭弹窗 */
  visible: boolean;
  /** @param onClose 关闭窗口回调 */
  onClose(): void;
}

const formStyle = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
};

/**
 * @name EditPermission 新增、编辑 权限
 */
const EditPermission: React.FC<EditPermissionProps> = ({
  id,
  onClose,
  visible,
}) => {

  const [form] = Form.useForm<TypeSystemPermission.Info>();

  const { loading } = useGetDetails(async () => {
    const data = await getPermissionDetails({ _id: id! });
    data && form.setFieldsValue(data);
  }, [id, form]);

  const { value: permissionTree } = useGetDetails(async () => {
    return visible ? await getPermissionTree({ tree: true }) : [];
  }, [visible]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updatePermission(values);
    else await addPermission(values);
    message.success('操作成功');
    onCancel();
  };

  async function checkField(field: 'code' | 'name', value: string) {
    const bol = await checkPermissionField({ [DB_PRIMARY_KEY]: id, [field]: value });
    return bol ? bol : Promise.reject('该字符已被占用，请更换后重试');
  };

  function onCancel() {
    onClose();
    form.resetFields();
  };

  const title = id ? '编辑权限' : '新增权限';

  return (
    <Modal
      title={title}
      onOk={onSumbit}
      visible={visible}
      loading={loading}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <FormMajorKey />

        <Form.Item
          name='name'
          label='权限名称'
          rules={[
            { required: true, pattern: CONSTANT_REG.CN, message: '且仅支持中文输入' },
            { validator: async (r, v: string) => checkField('name', v) }
          ]}>
          <Input placeholder='请输入权限中文名称' allowClear />
        </Form.Item>

        <Form.Item
          name='code'
          label='权限 Key'
          rules={[
            { required: true, pattern: CONSTANT_REG.EN, message: '且仅支持英文输入' },
            { validator: async (r, v: string) => checkField('code', v) }
          ]}>
          <Input placeholder='请输入权限Key（英文名）' allowClear />
        </Form.Item>

        <FormItemLocation id={id} treeData={permissionTree} />

        <Form.Item
          label="权限类型"
          name='type'
          initialValue={ENUM_SYSTEM.PERMISSION_TYPE.PAGE}>
          <Radio.Group>
            {CONSTANT_SYSTEM.LIST_PERMISSION_TYPE.map(v => <Radio key={v.key} value={v.key}>{v.value}</Radio>)}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="状态"
          name='status'
          initialValue={ENUM_COMMON.STATUS.ACTIVATE}>
          <Switch />
        </Form.Item>

        <Form.Item name="remark" label="备注">
          <Input.TextArea placeholder='请输入相关备注（选填）' />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default memo(EditPermission);
