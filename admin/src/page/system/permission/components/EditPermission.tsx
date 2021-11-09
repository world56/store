import { memo } from 'react';
import { Switch } from '@/components/Formatting';
import { Modal, Form, Input, Cascader, Radio, message } from 'antd';
import { addCommodityDetails } from '@/api/system';

import { ENUM_SYSTEM } from '@/enum/system';
import { CONSTANT_REG } from '@/constant/reg';
import { CONSTANT_SYSTEM } from '@/constant/system';
import { ENUM_COMMON } from '@/enum/common';

import type { TypeSystemPermission } from '@/interface/system/permission';

interface EditPermissionProps {
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

  const [form] = Form.useForm<TypeSystemPermission.EditPermission>();

  async function onSumbit() {
    const values = await form.validateFields();
    await addCommodityDetails(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    onClose();
    form.resetFields();
  }

  return (
    <Modal
      title='编辑'
      onOk={onSumbit}
      visible={visible}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <Form.Item
          name='name'
          label='权限名称'
          rules={[{
            required: true,
            pattern: CONSTANT_REG.CN,
            message: '权限名称不得为空，且仅支持中文输入'
          }]}>
          <Input placeholder='请输入权限中文名称' allowClear />
        </Form.Item>

        <Form.Item
          name='code'
          label='权限 Key'
          rules={[{
            required: true,
            pattern: CONSTANT_REG.EN,
            message: '权限Key不得为空，且仅支持英文输入'
          }]}>
          <Input placeholder='请输入权限Key（英文名）' allowClear />
        </Form.Item>

        <Form.Item
          name="location"
          label="所属层级">
          <Cascader
            allowClear
            options={[]}
            placeholder='清选择所属层级（不填默认一级）' />
        </Form.Item>

        <Form.Item
          label="权限类型"
          name='type'
          initialValue={ENUM_SYSTEM.PERMISSION_TYPE.PAGE}
          rules={[{ required: true, message: '权限类型为必选项' }]}>
          <Radio.Group>
            {CONSTANT_SYSTEM.LIST_PERMISSION_TYPE.map(v =>
              <Radio key={v.key} value={v.key}>{v.value}</Radio>
            )}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="状态"
          name='status'
          initialValue={ENUM_COMMON.STATUS.ACTIVATE}
          rules={[{ required: true, message: '权限状态为必选项' }]}>
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
