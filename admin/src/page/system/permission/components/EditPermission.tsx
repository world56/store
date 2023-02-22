import {
  insertPermission,
  updatePermission,
  getPermissionList,
  getPermissionDetails,
  checkPermissionField,
} from '@/api/system';
import { memo } from 'react';
import { Modal } from "@/layout/PopUp";
import { listToTree } from '@/utils/format';
import { Switch } from '@/components/Formatting';
import { useGetDetails, useCategorys } from '@/hooks';
import { Form, Input, Radio, message, TreeSelect } from 'antd';
import { FormHideKey, FormValueCheck } from '@/components/Form';

import { ENUM_SYSTEM } from '@/enum/system';
import { ENUM_COMMON } from '@/enum/common';
import { CONSTANT_REG } from '@/constant/reg';
import { CONFIG_ANTD_COMP } from '@/config/format';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemPermission } from '@/interface/system/permission';


export interface TypeEditPermissionProps extends Partial<TypeCommon.DatabaseMainParameter> {
  /** @param visible 控制开启、关闭弹窗 */
  visible: boolean;
  /** @name onClose 关闭窗口回调 */
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

  const { PERMISSION_TYPE } = useCategorys();

  const [form] = Form.useForm<TypeSystemPermission.DTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getPermissionDetails({ id: id! });
    data && form.setFieldsValue(data);
  }, [id, form]);

  const { value: treeData, loading: treeLoad } = useGetDetails(async () => {
    const res = await getPermissionList({ status: ENUM_COMMON.STATUS.ACTIVATE });
    return listToTree(res, 0, id);
  }, [visible, id]);

  async function onSubmit() {
    const values = await form.validateFields();
    if (id) await updatePermission(values);
    else await insertPermission(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      onOk={onSubmit}
      loading={loading}
      onCancel={onCancel}
      title={id ? '编辑权限' : '新增权限'}>
      <Form form={form} {...formStyle}>

        <FormHideKey />

        <FormValueCheck
          id={id}
          name='name'
          label='权限名称'
          checkFieldsFn={checkPermissionField}
        />

        <FormValueCheck
          id={id}
          name='code'
          label='权限Key'
          pattern={CONSTANT_REG.EN}
          checkFieldsFn={checkPermissionField}
        />

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
            {PERMISSION_TYPE?.LIST.map(v => <Radio key={v.id} value={v.id}>{v.name}</Radio>)}
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
