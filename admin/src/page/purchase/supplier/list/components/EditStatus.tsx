import { useEffect } from "react";
import { useCategorys } from "@/hooks";
import { rules } from './EditSupplier';
import { Modal } from "@/layout/PopUp";
import { statusReversal } from "@/utils";
import { FormHideKey } from "@/components/Form";
import { Form, Input, message, Select } from "antd";
import { changePurchaseSupplierStatus } from "@/api/purchase";

import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

export interface TypeEditStatus extends Partial<Pick<TypePurchaseSupplier.EditStatus, 'status' | 'id'>> {
  onClose(): void;
};

const { Option } = Select;

/**
 * @name EditStatus 改变供应商状态（冻结、激活）
 */
const EditStatus: React.FC<TypeEditStatus> = ({ id, status, onClose }) => {

  const { STATUS } = useCategorys();
  const [form] = Form.useForm<TypePurchaseSupplier.EditStatus>();

  async function onSumbit() {
    const values = await form.validateFields();
    await changePurchaseSupplierStatus(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    id && form.setFieldsValue({ id, status: statusReversal(status) });
  }, [id, status, form]);

  return (
    <Modal
      onOk={onSumbit}
      open={Boolean(id)}
      title='供应商状态编辑'
      onCancel={onCancel}>
      <Form form={form} layout='vertical'>

        <FormHideKey />

        <Form.Item
          label='状态'
          name='status'
          tooltip='如被冻结则无法向该供应商发起采购订单'
          rules={[{ required: true, message: '请选择状态' }]}>
          <Select placeholder='请选择状态'>
            {STATUS?.LIST.map(v => <Option key={v.id} value={v.id} >{v.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item name='content' label='操作原因' rules={rules}>
          <Input.TextArea rows={3} allowClear />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditStatus;
