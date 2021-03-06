import {
  insertSupplierProduct,
  updateSupplierProduct,
  getSupplierProductDetails,
} from '@/api/purchase';
import BasicInfo from './BasicInfo';
import { Drawer } from "@/layout/PopUp";
import { useGetDetails } from '@/hooks';
import { serverToForm } from '../../utils';
import Uploads from '@/components/Uploads';
import styles from '../../index.module.sass';
import { useCallback, useState } from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { Form, Tabs, notification, message } from "antd";

import type { TypeCommon } from "@/interface/common";
import type { TypeSupplierProductPageProps } from '../../';
import type { TypeSupplierProduct } from "@/interface/purchase/product";

export interface TypeEditProductProps
  extends
  TypeSupplierProductPageProps,
  Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
};

/**
 * @name EditProduct 编辑产品
 */
const EditProduct: React.FC<TypeEditProductProps> = ({ id, visible, supplierId, onClose }) => {

  const [form] = Form.useForm<TypeSupplierProduct.EditDTO>();

  const [activeKey, setActiveKey] = useState('1');

  const { loading } = useGetDetails(async () => {
    const data = await getSupplierProductDetails({ id: id! });
    form.setFieldsValue(serverToForm(data));
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updateSupplierProduct(values);
    else await insertSupplierProduct(values);
    message.success('操作成功')
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    setActiveKey('1');
    onClose();
  };

  const verifyFormat = useCallback((suffix: string) => {
    if (Uploads.SUFFIX.IMAGE.includes(suffix.toLocaleLowerCase())) {
      return true;
    }
    notification.warn({
      message: '警告',
      icon: <WarningOutlined />,
      description: `仅支持图片文件格式(${Uploads.SUFFIX.IMAGE.join('、')})，请检查后在尝试上传。`,
    });
    return false;
  }, []);

  return (
    <Drawer
      loading={loading}
      visible={visible}
      onCancel={onCancel}
      onSumbit={onSumbit}
      className={styles.edit}
      title={id ? '编辑产品' : '新增产品'}>
      <Form form={form} layout='vertical'>
        <Tabs size='small' activeKey={activeKey} onChange={setActiveKey}>
          <Tabs.TabPane key='1' tab='基本信息' forceRender>
            <BasicInfo id={id} supplierId={supplierId} form={form} />
          </Tabs.TabPane>
          <Tabs.TabPane key='2' tab='产品实拍' forceRender>
            <Form.Item name='pictures'>
              <Uploads verifyFormat={verifyFormat} />
            </Form.Item>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default EditProduct;
