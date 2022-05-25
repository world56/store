import { useState } from 'react';
import { useGetDetails } from '@/hooks';
import { Drawer } from '@/layout/PopUp';
import { Form, Input, Tabs } from "antd";
import styles from '../index.module.sass';
import FormContacts from './FormContacts';
import Uploads from '@/components/Uploads';
import { PopUpAddBtn } from '@/layout/Button';
import Categorys from "@/components/Categorys";
import { filterFormError, dtoServiceToForm } from '../utils';
import { FormHideKey, FormValueCheck } from "@/components/Form";
import {
  insertPurchaseSupplier,
  updatePurchaseSupplier,
  getPurchaseSupplierDetails,
  checkPurchaseSupplierFields,
} from '@/api/purchase';

import { ENUM_STORE } from "@/enum/store";

import type { TypeCommon } from '@/interface/common';
import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

export interface TypeEditSupplierProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  /** @name onClose 关闭弹窗 */
  onClose(): void;
};

export const rules = [{ required: true }];

/**
 * @name EditSupplier 编辑供应商
 */
const EditSupplier: React.FC<TypeEditSupplierProps> = ({ id, visible, onClose }) => {

  const [form] = Form.useForm<TypePurchaseSupplier.EditSupplierDTO>();

  const [activeKey, setActiveKey] = useState('1');

  const { loading } = useGetDetails(async () => {
    const data = await getPurchaseSupplierDetails({ id: id! });
    form.setFieldsValue(dtoServiceToForm(data));
  }, [id, form]);

  async function onSumbit() {
    try {
      const values = await form.validateFields();
      if (id) await updatePurchaseSupplier(values);
      else await insertPurchaseSupplier(values);
      onCancel();
    } catch (e) {
      // 联系方式可能需要提示一下
      filterFormError(e) && setActiveKey('2');
    }
  };

  function onCancel() {
    setActiveKey('1');
    form.resetFields();
    onClose();
  };

  function addContacts() {
    const value = form.getFieldValue('contacts');
    value.push({});
    form.setFields([{ name: 'contacts', value }]);
  };

  const title = id ? '编辑供应商' : '新增供应商';

  return (
    <Drawer
      title={title}
      loading={loading}
      visible={visible}
      onCancel={onCancel}
      onSumbit={onSumbit}
      className={styles.layout}>
      <Form form={form} layout='vertical'>
        <Tabs size='small' onChange={setActiveKey} activeKey={activeKey}>

          <Tabs.TabPane key='1' tab='基本信息' forceRender>

            <FormHideKey />

            <FormValueCheck
              id={id}
              name='name'
              label='供应商名称'
              checkFieldsFn={checkPurchaseSupplierFields}
            />

            <Form.Item
              name='type'
              rules={[{ required: true, message: '请选择供应产品类型' }]}
              label={<>
                <span>供应产品类型</span>
                <Categorys type={ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE} />
              </>}>
              <Categorys.Select mode='multiple' type={ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE} />
            </Form.Item>

            <Form.Item name='remark' label='备注'>
              <Input.TextArea placeholder="请输入备注" rows={3} allowClear />
            </Form.Item>

          </Tabs.TabPane>

          <Tabs.TabPane key='2' tab='联系方式' forceRender>
            <Form.Item shouldUpdate>
              {(props) => {
                const contacts = props.getFieldValue('contacts');
                return <Form.List name='contacts' initialValue={[{}]}>
                  {(fields, props) => fields.map(field => <FormContacts
                    key={field.key}
                    itemProps={field}
                    remove={contacts?.length > 1 ? () => props.remove(field.name) : undefined} />)}
                </Form.List>
              }}
            </Form.Item>
            <PopUpAddBtn onClick={addContacts}>新增联系方式</PopUpAddBtn>
          </Tabs.TabPane>

          <Tabs.TabPane key='3' tab='附件' forceRender>
            <Form.Item name='files' >
              <Uploads />
            </Form.Item>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default EditSupplier;
