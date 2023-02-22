import { Modal } from "@/layout/PopUp";
import { useGetDetails } from "@/hooks";
import styles from '../index.module.sass';
import { Form, Input, message } from "antd";
import Categorys from "@/components/Categorys";
import { FormHideKey } from "@/components/Form";
import { getCollectionAccountDetails, insertCollectionAccount, updateCollectionAccount } from "@/api/finance";

import { ENUM_STORE } from "@/enum/store";
import { CONSTANT_REG } from "@/constant/reg";

import type { ModalProps } from 'antd';
import type { TypePatmentAccountPageProps } from "..";
import type { TypeFinancePaymentAccount } from "@/interface/finance/account";

export interface TypeEditSupplierCollectionAccountProps
  extends
  Pick<ModalProps, 'open'>,
  TypePatmentAccountPageProps,
  Partial<Pick<TypeFinancePaymentAccount.DTO, 'id'>> {
  /**
   * @name onClose 关闭弹窗
   */
  onClose(): void;
};

const rules = [{ required: true }, { pattern: CONSTANT_REG.SPACE, message: '不得输入空格' }];

/**
 * @name EditSupplierCollectionAccount 编辑、新增供应商收款账户
 */
const EditSupplierCollectionAccount: React.FC<TypeEditSupplierCollectionAccountProps> = ({
  id,
  open,
  onClose,
  supplierId,
}) => {

  const [form] = Form.useForm<TypeFinancePaymentAccount.DTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getCollectionAccountDetails({ id: id! });
    form.setFieldsValue(data);
  }, [id, form]);

  async function onSubmit() {
    const values = await form.validateFields();
    if (id) await updateCollectionAccount(values);
    else await insertCollectionAccount(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  const title = `${id ? '编辑' : '新增'}供应商收款账户`;

  return (
    <Modal
      open={open}
      title={title}
      onOk={onSubmit}
      loading={loading}
      onCancel={onCancel}
      className={styles.edit}>
      <Form form={form} layout='vertical'>

        <FormHideKey />

        <Form.Item
          rules={rules}
          label='所属供应商'
          name='supplierId'
          initialValue={supplierId}>
          <Categorys.Select disabled={Boolean(supplierId)} type={ENUM_STORE.CATEGORY.PURCHASE_SUPPLIER} />
        </Form.Item>

        <Form.Item
          rules={rules}
          name='organizationId'
          label={
            <>
              <span>账户类型</span>
              <Categorys type={ENUM_STORE.CATEGORY.BANK} />
            </>
          }>
          <Categorys.Select type={ENUM_STORE.CATEGORY.BANK} />
        </Form.Item>

        <Form.Item label='收款人账户姓名' name='accountName' rules={rules}>
          <Input placeholder="请输入收款人姓名" allowClear />
        </Form.Item>

        <Form.Item label='收款人账户' name='accountNumber' rules={rules}>
          <Input placeholder="请输入收款人账户" allowClear />
        </Form.Item>

        <Form.Item label='备注' name='remark'>
          <Input.TextArea rows={3} placeholder='请输入备注' />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditSupplierCollectionAccount;
