import { useEffect } from "react";
import { Form, Input } from "antd";
import { useActions } from "@/hooks";
import { Modal } from "@/layout/PopUp";
import styles from '../index.module.sass';
import Uploads from "@/components/Uploads";

import { ENUM_STORE } from "@/enum/store";

export const rules = [{ required: true }];

interface TypeAddLogsProps {
  onClose?(): void;
};

/**
 * @name AddLog 新增日志
 */
const AddLog: React.FC<TypeAddLogsProps> = ({ onClose }) => {

  const actions = useActions();
  const [form] = Form.useForm();

  async function onSumbit() {
    const values = await form.validateFields();
    console.log(values);
  };

  function onCancel() {
    onClose?.();
  };

  useEffect(() => {
    actions.getCategory([ENUM_STORE.CATEGORY.LOGISTSCS_COMPANY]);
  }, [actions]);

  return (
    <Modal
      visible
      onOk={onSumbit}
      title='添加日志记录'
      onCancel={onCancel}
      className={styles.addLog}>
      <Form form={form} layout='vertical'>

        <Form.Item name='remark' label='备注' rules={rules}>
          <Input.TextArea placeholder='请输入备注' rows={4} allowClear />
        </Form.Item>

        <Form.Item name='remark' label='附件'>
          <Uploads />
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

export default AddLog;
