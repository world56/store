import {
  insertPermission,
  updatePermission,
  getPermissionTree,
  getPermissionDetails,
  checkPermissionField,
} from '@/api/system';
import { memo } from 'react';
import Modal from '@/layout/Modal';
import { useGetDetails } from '@/hooks';
import { FormMajorKey } from '@/components/Form';
import { Switch } from '@/components/Formatting';
import { permissionToTree } from '../../../../utils';
import { Form, Input, Radio, message, TreeSelect } from 'antd';

import { ENUM_SYSTEM } from '@/enum/system';
import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_REG } from '@/constant/reg';
import { CONFIG_ANTD_COMP } from '@/config/format';
import { CONSTANT_SYSTEM } from '@/constant/system';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemPermission } from '@/interface/system/permission';

/** 
 * @param id 查询ID
 * @param visible 控制开启、关闭弹窗
 * @param onClose 关闭窗口回调
 */
export interface TypeEditPermissionProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
};

const formStyle = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
};

/**
 * @name EditPermission 新增、编辑 权限
 */
const EditPermission: React.FC<TypeEditPermissionProps> = ({
  id,
  onClose,
  visible,
}) => {

  const [form] = Form.useForm<TypeSystemPermission.DTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getPermissionDetails({ id: id! });
    data && form.setFieldsValue(data);
  }, [id, form]);

  const { value: treeData, loading: treeLoad } = useGetDetails(async () => {
    const res = await getPermissionTree();
    return permissionToTree(res, 0, id);
  }, [visible, id]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updatePermission(values);
    else await insertPermission(values);
    message.success('操作成功');
    onCancel();
  };

  async function checkField(field: 'code' | 'name', value: string) {
    const bol = await checkPermissionField({ [DB_PRIMARY_KEY]: id, [field]: value });
    return bol ? Promise.reject('该字符已被占用，请更换后重试') : bol;
  };

  function onCancel() {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      onOk={onSumbit}
      visible={visible}
      loading={loading}
      onCancel={onCancel}
      title={id ? '编辑权限' : '新增权限'}>
      <Form form={form} {...formStyle}>

        <FormMajorKey />

        <Form.Item
          name='name'
          label='权限名称'
          rules={[
            { required: true, message: '不得为空' },
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

        <Form.Item name='parentId' label='所属模块'>
          <TreeSelect
            allowClear
            loading={treeLoad}
            treeData={treeData}
            treeDefaultExpandAll
            placeholder="请选择所属模块"
            fieldNames={CONFIG_ANTD_COMP.CASCADER_FIELD_PERMISSION} />
        </Form.Item>

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
          <Input.TextArea allowClear placeholder='请输入相关备注（选填）' />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default memo(EditPermission);
