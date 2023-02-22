import { useCallback } from "react";
import { Modal } from "@/layout/PopUp";
import styles from '../index.module.sass';
import Uploads from '@/components/Uploads';
import { FormHideKey } from "@/components/Form";
import { WarningOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, notification } from "antd";

import type { TypeFinancePayment } from "@/interface/finance/payment";

const rules = [{ required: true }];
const CHECK_FILE_TYPE = [...Uploads.SUFFIX.IMAGE, ...Uploads.SUFFIX.VIDEO];

/**
 * @name EditPaymentStatus 编辑付款状态
 */
const EditPaymentStatus = () => {

  const [form] = Form.useForm<TypeFinancePayment.DTO>();

  async function onSubmit() {
    const values = await form.validateFields();
    console.log('@-values', values);
  }

  function onCancel() {
    form.resetFields();
  };

  const verifyFormat = useCallback((suffix: string) => {
    if (CHECK_FILE_TYPE.includes(suffix.toLocaleLowerCase())) {
      return true;
    }
    notification.warning({
      message: '警告',
      icon: <WarningOutlined />,
      description: `仅支持图片、视频文件格式(${Uploads.SUFFIX.IMAGE.join('、')})，请检查后在尝试上传。`,
    });
    return false;
  }, []);

  return (
    <Modal
      // open={true}
      onOk={onSubmit}
      title='确认付款信息'
      onCancel={onCancel}
      className={styles.edit}>
      <Form form={form} layout='vertical' initialValues={{ totalAmount: 123 }}>
        <FormHideKey />
        <Form.Item label='应付款金额（元）' name='totalAmount'>
          <InputNumber placeholder="请输入实际付款金额（元）" disabled />
        </Form.Item>
        <Form.Item label='实付款金额（元）' name='actualPayment' rules={rules}>
          <InputNumber placeholder="请输入实际付款金额（元）" />
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label='付款凭证' name='vouchers' rules={rules}>
          <Uploads verifyFormat={verifyFormat} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPaymentStatus;
