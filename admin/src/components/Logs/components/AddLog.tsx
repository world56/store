import { useState } from "react";
import { isVoid } from "@/utils";
import { Modal } from "@/layout/PopUp";
import { insertLog } from "@/api/common";
import styles from '../index.module.sass';
import Categorys from "@/components/Categorys";
import { FileAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from "antd";

import { LOG_MODULE_TO_CATEGORY } from '../utils';

import type { TypeLogsProps } from '..';
import type { TypeLog } from "@/interface/log";
import type { TypeCommon } from "@/interface/common";

export const rules = [{ required: true }];

interface TypeAddLogsProps extends Pick<TypeLogsProps, 'id' | 'module'> {
  /** 
   * @name onClose 关闭弹窗
   */
  onClose(): void;
  /**
   * @param type redux category key
   */
  type: TypeCommon.ConstantVal<typeof LOG_MODULE_TO_CATEGORY>;
};

/**
 * @name AddLog 新增日志
 */
const AddLog: React.FC<TypeAddLogsProps> = ({ id, type, module, onClose }) => {

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<TypeLog.Insert>();

  async function onSubmit() {
    if (id && !isVoid(module)) {
      const values = await form.validateFields();
      values.relationId = id;
      values.module = module!;
      await insertLog(values);
      message.success('操作成功');
      onCancel();
    }
  };

  function onOpen() {
    setOpen(b => !b);
  };

  function onCancel() {
    onOpen();
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} icon={<FileAddOutlined />}>新增日志</Button>
      <Modal
        open={open}
        onOk={onSubmit}
        title='添加日志记录'
        onCancel={onCancel}
        className={styles.addLog}>
        <Form form={form} layout='vertical'>

          <Form.Item name='type' label='类型' rules={rules}>
            <Categorys.Select type={type} />
          </Form.Item>

          <Form.Item name='remark' label='备注' rules={rules}>
            <Input.TextArea placeholder='请输入备注' rows={4} allowClear />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default AddLog;
