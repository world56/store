import { useEffect } from 'react';
import { serverToForm } from './utils';
import { GoBack } from "@/layout/Button";
import styles from './index.module.sass';
import { Form, message, Spin } from "antd";
import BasicInfo from "./components/BasicInfo";
import Statistics from "./components/Statistics";
import { useActions, useGetDetails } from '@/hooks';
import { useNavigate, useSearchParams } from "react-router-dom";
import SupplierProduct from "./components/SupplierProduct";
import { getPirchaseOrderDetails, insertPurchaseOrder, updatePurchaseOrder } from "@/api/purchase";

import { ENUM_STORE } from '@/enum/store';

import type { ShouldUpdate } from 'rc-field-form/lib/Field';
import type { TypePurchaseOrder } from "@/interface/purchase/order";

/**
 * @name EditPurchaseOrder 编辑、创建供应商订单
 */
const EditPurchaseOrder = () => {

  const [params] = useSearchParams();
  const id = params.get('id');

  const actions = useActions();
  const navigate = useNavigate();

  const [form] = Form.useForm<TypePurchaseOrder.EditDTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getPirchaseOrderDetails({ id: id! });
    const values = serverToForm(data);
    form.setFieldsValue(values);
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updatePurchaseOrder(values);
    else await insertPurchaseOrder(values);
    form.resetFields();
    message.success(id ? '操作成功' : '操作成功，可继续新建采购单');
    id && navigate(-1);
  };

  const shouldUpdate: ShouldUpdate<TypePurchaseOrder.EditDTO> = (prve, next) => {
    return prve.supplierId !== next.supplierId;
  };

  useEffect(() => {
    actions.getCategory([
      ENUM_STORE.CATEGORY.LOGISTSCS_COMPANY,
      ENUM_STORE.CATEGORY.PURCHASE_SUPPLIER
    ]);
  }, [actions]);

  return (
    <Spin spinning={loading}>
      <Form form={form} layout='vertical' className={styles.layout}>
        <BasicInfo />
        <Form.Item noStyle shouldUpdate={shouldUpdate}>
          {() => <SupplierProduct form={form} />}
        </Form.Item>
        <Statistics />
        <GoBack onSumbit={onSumbit} />
      </Form>
    </Spin>
  );
};

export default EditPurchaseOrder;
