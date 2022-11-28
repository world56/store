import {
  insertPurchaseSupplier,
  updatePurchaseSupplier,
  getPurchaseSupplierDetails,
  checkPurchaseSupplierFields,
} from '@/api/purchase';
import Contacts from './Contacts';
import { useGetDetails } from '@/hooks';
import { Drawer } from '@/layout/PopUp';
import { useRef, useState } from 'react';
import { Form, Input, Tabs } from "antd";
import Uploads from '@/components/Uploads';
import { removeFiles } from '@/api/common';
import styles from '../../index.module.sass';
import { PopUpAddBtn } from '@/layout/Button';
import Categorys from "@/components/Categorys";
import { filterFormError, dtoServiceToForm } from '../../utils';
import { FormHideKey, FormValueCheck } from "@/components/Form";

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

  const removeIds = useRef<number[]>([]);

  const [form] = Form.useForm<TypePurchaseSupplier.EditDTO>();

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
      removeFile();
      onCancel();
    } catch (e) {
      // 联系方式可能需要提示一下
      filterFormError(e) && setActiveKey('2');
    }
  };

  function onDelete(id: number) {
    removeIds.current.push(id);
  };

  async function removeFile() {
    if (removeIds.current.length) {
      await removeFiles({ ids: removeIds.current });
      removeIds.current = [];
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
      width={550}
      title={title}
      open={visible}
      loading={loading}
      onCancel={onCancel}
      onSumbit={onSumbit}
      className={styles.layout}>
      <Form form={form} layout='vertical'>
        <Tabs
          size='small'
          activeKey={activeKey}
          onChange={setActiveKey}
          items={[
            {
              key: '1',
              label: '基本信息',
              forceRender: true,
              children: <>
                <FormHideKey />

                <FormValueCheck
                  id={id}
                  name='name'
                  label='公司名称'
                  checkFieldsFn={checkPurchaseSupplierFields}
                />

                <Form.Item name='phone' label='公司电话' rules={rules}>
                  <Input placeholder="请输入公司电话" allowClear />
                </Form.Item>

                <Form.Item name='address' label='公司地址' rules={rules}>
                  <Input placeholder="请输入公司地址" allowClear />
                </Form.Item>

                <Form.Item
                  name='category'
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
              </>
            },
            {
              key: '2',
              label: '联系人',
              forceRender: true,
              children: <>
                <Form.Item shouldUpdate>
                  {(props) => {
                    const contacts = props.getFieldValue('contacts');
                    return <Form.List name='contacts' initialValue={[{}]}>
                      {(fields, props) => fields.map(field => <Contacts
                        key={field.key}
                        itemProps={field}
                        remove={contacts?.length > 1 ? () => props.remove(field.name) : undefined} />)}
                    </Form.List>
                  }}
                </Form.Item>
                <PopUpAddBtn onClick={addContacts}>新增联系方式</PopUpAddBtn>
              </>
            },
            {
              key: '3',
              label: '附件',
              forceRender: true,
              children: <Form.Item name='files'>
                <Uploads onDelete={onDelete} />
              </Form.Item>
            }
          ]}
        />
      </Form>
    </Drawer>
  );
};

export default EditSupplier;
