import { useCategorys } from "@/hooks";
import { useMemo, useState } from "react";
import { ENUM_PURCHASE } from "@/enum/purchase";
import { FormHideKey } from "@/components/Form";
import { FileDoneOutlined } from '@ant-design/icons';
import { insertPurchaseSupplierLog } from "@/api/purchase";
import { Form, Input, Select, Modal, Button, message } from "antd";

import type { TypeLogsProps } from ".";
import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

const { Option } = Select;

interface TypeAddLogProps extends Pick<TypeLogsProps, 'id'> {
  initializa(): void;
};

/**
 * @name AddLog 新增日志记录
 */
const AddLog: React.FC<TypeAddLogProps> = ({ id, initializa }) => {

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm<TypePurchaseSupplier.LogDTO>();

  const { SUPPLIER_LOG_TYPE } = useCategorys();

  async function onSumbit() {
    const values = await form.validateFields();
    await insertPurchaseSupplierLog(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    setVisible(false);
    initializa();
  };

  const types = useMemo(() => (
    SUPPLIER_LOG_TYPE?.LIST.filter(v => v.id !== ENUM_PURCHASE.SUPPLIER_LOG_TYPE.STATUS)
  ), [SUPPLIER_LOG_TYPE]);

  return (
    <>
      <Button
        icon={<FileDoneOutlined />}
        onClick={() => setVisible(true)}>
        添加日志
      </Button>

      <Modal
        open={visible}
        onOk={onSumbit}
        onCancel={onCancel}
        title='新增供应商日志记录'>
        <Form form={form}>

          <FormHideKey initialValue={id} />

          <Form.Item label='日志类型' name='type'>
            <Select placeholder='请选选择日志类型' allowClear>
              {types?.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label='日志内容' name='content'>
            <Input.TextArea placeholder="请输入日志内容" rows={4} allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddLog;
