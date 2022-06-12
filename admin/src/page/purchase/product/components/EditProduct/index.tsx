import Spec from "./Spec";
import { Form, Tabs } from "antd";
import { useEffect } from 'react';
import BasicInfo from './BasicInfo';
import { useActions } from '@/hooks';
import { Drawer } from "@/layout/PopUp";
import styles from '../index.module.sass';

import { ENUM_STORE } from "@/enum/store";

import type { TypeCommon } from "@/interface/common";
import type { TypePurchaseProduct } from "@/interface/purchase/product";

export interface TypeEditProductProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
};

/**
 * @name EditProduct 编辑产品
 */
const EditProduct: React.FC<TypeEditProductProps> = ({ id, visible, onClose }) => {

  const actions = useActions();
  const [form] = Form.useForm<TypePurchaseProduct.EditDTO>();

  function onCancel() {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    actions.getCategory([
      ENUM_STORE.CATEGORY.SPEC,
      ENUM_STORE.CATEGORY.PRODUCT_BRAND,
      ENUM_STORE.CATEGORY.WAREHOUSE_UNIT,
      ENUM_STORE.CATEGORY.PURCHASE_SUPPLIER,
      ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE,
    ]);
  }, [actions, form]);

  return (
    <Drawer title='编辑产品' visible={visible} onCancel={onCancel} className={styles.edit}>
      <Form form={form} layout='vertical'>
        <Tabs size='small' defaultActiveKey="1">
          <Tabs.TabPane key='1' tab='基本信息' forceRender>
            <BasicInfo />
          </Tabs.TabPane>
          <Tabs.TabPane key='2' tab='产品规格' forceRender>
            <Spec />
          </Tabs.TabPane>
          <Tabs.TabPane key='3' tab='供应商' forceRender>
          </Tabs.TabPane>
          <Tabs.TabPane key='4' tab='实拍图' forceRender>
          </Tabs.TabPane>
          <Tabs.TabPane key='5' tab='其他附件' forceRender>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default EditProduct;
