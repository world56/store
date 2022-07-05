import { useEffect } from 'react';
import { serverToForm } from './utils';
import styles from './index.module.sass';
import { Form, message, Spin } from "antd";
import BasicInfo from "./components/BasicInfo";
import { FooterButton } from "@/layout/Button";
import Statistics from "./components/Statistics";
import { useActions, useGetDetails } from '@/hooks';
import SupplierProduct from "./components/SupplierProduct";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getPirchaseOrderDetails, insertPurchaseOrder, updatePurchaseOrder } from "@/api/purchase";

import { ENUM_STORE } from '@/enum/store';

import type { ShouldUpdate } from 'rc-field-form/lib/Field';
import type { TypePurchaseOrder } from "@/interface/purchase/order";

interface TypeEditPurchaseOrderRouteProps extends Pick<TypePurchaseOrder.DTO, 'id'> { };

/**
 * @name EditPurchaseOrder 编辑、创建供应商订单
 */
const EditPurchaseOrder = () => {

  const actions = useActions();
  const history = useHistory();
  const { params: { id } } = useRouteMatch<TypeEditPurchaseOrderRouteProps>();

  const [form] = Form.useForm<TypePurchaseOrder.EditDTO>();

  const { loading } = useGetDetails(async () => {
    const data = await getPirchaseOrderDetails({ id });
    const values = serverToForm(data);
    form.setFieldsValue(values);
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updatePurchaseOrder(values);
    else await insertPurchaseOrder(values);
    form.resetFields();
    message.success(id ? '操作成功' : '操作成功，可继续新建采购单');
    id && history.goBack();
  };

  const shouldUpdate: ShouldUpdate<TypePurchaseOrder.EditDTO> = (prve, next) => {
    return prve.supplierId !== next.supplierId;
  };

  function onCancel() {
    history.goBack();
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
        <FooterButton
          align="center"
          onCancelText='返回'
          onCancel={onCancel}
          onSumbit={onSumbit}
        />
      </Form>
    </Spin>
  );
};

export default EditPurchaseOrder;
