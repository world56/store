import { useEffect } from "react";
import { useCategorys } from "@/hooks";
import { Modal } from "@/layout/PopUp";
import { statusReversal } from "@/utils";
import { FormHideKey } from "@/components/Form";
import { Form, Input, Select, message } from "antd";

import type { TypeCommon } from "@/interface/common";

export interface TypeEditStatusProps extends Partial<TypeCommon.ChangeStatus> { };

export type TypeEditStatus<T = TypeEditStatusProps> = T & {
  requestFn(data: T): Promise<boolean>;
  onClose(): void;
};

const { Option } = Select;
const rules = [{ required: true }];

/**
 * @name EditStatus 修改状态（冻结、激活）
 */
const EditStatus: React.FC<TypeEditStatus> = ({ id, requestFn, status, onClose }) => {

  const { STATUS } = useCategorys();
  const [form] = Form.useForm<TypeCommon.ChangeStatus>();

  async function onSubmit() {
    const values = await form.validateFields();
    await requestFn(values);
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
      title='状态编辑'
      onOk={onSubmit}
      open={Boolean(id)}
      onCancel={onCancel}>
      <Form form={form} layout='vertical'>

        <FormHideKey />

        <Form.Item
          label='状态'
          name='status'
          tooltip='状态被冻结后，无法在发起任何关联操作'
          rules={[{ required: true, message: '请选择状态' }]}>
          <Select placeholder='请选择状态'>
            {STATUS?.LIST.map(v => <Option key={v.id} value={v.id} >{v.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item name='content' label='状态变更原因' rules={rules}>
          <Input.TextArea rows={3} allowClear />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditStatus;
