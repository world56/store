import { GoBack } from "@/layout/Button";
import styles from './index.module.sass';
import { useEffect, useMemo } from 'react';
import { Form, message, Spin } from "antd";
import BasicInfo from "./components/BasicInfo";
import Statistics from "./components/Statistics";
import { useActions, useGetDetails } from '@/hooks';
import SupplierProduct from "./components/SupplierProduct";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formToServer, serverToForm, editParams } from './utils';
import { getPurchaseOrderDetails, insertPurchaseOrder, updatePurchaseOrder } from "@/api/purchase";

import { ENUM_STORE } from '@/enum/store';

import type { ShouldUpdate } from 'rc-field-form/lib/Field';
import type { TypePurchaseOrder } from "@/interface/purchase/order";

/**
 * @name EditPurchaseOrder 编辑、创建供应商订单
 */
const EditPurchaseOrder = () => {

  const [params] = useSearchParams();
  const id = parseInt(params.get('id')!);
  const supplierId = parseInt(params.get('supplierId')!);

  const actions = useActions();
  const navigate = useNavigate();

  const [form] = Form.useForm<TypePurchaseOrder.EditDTO>();

  const { loading, value } = useGetDetails(async () => {
    const data = await getPurchaseOrderDetails({ id: id! });
    const values = serverToForm(data);
    form.setFieldsValue(values);
    return data;
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    const data = formToServer(values);
    data.products.forEach(v => {
      v.remark = '9999'
    })
    if (id) await updatePurchaseOrder(data);
    else await insertPurchaseOrder(data);
    form.resetFields();
    message.success(id ? '操作成功' : '操作成功，可继续新建采购单');
    id && navigate(-1);
  };

  const editStatus = useMemo(() => editParams(value), [value]);

  useEffect(() => {
    actions.getCategory([
      ENUM_STORE.CATEGORY.LOGISTSCS_COMPANY,
      ENUM_STORE.CATEGORY.PURCHASE_SUPPLIER
    ]);
  }, [actions]);

  useEffect(() => {
    !id && supplierId && form.setFieldsValue({ supplierId });
  }, [id, supplierId, form]);

  const shouldUpdate: ShouldUpdate<TypePurchaseOrder.EditDTO> = (prve, next) => {
    return prve.supplierId !== next.supplierId;
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} layout='vertical' className={styles.layout}>
        <BasicInfo />
        <Form.Item noStyle shouldUpdate={shouldUpdate}>
          {() => <SupplierProduct form={form} editStatus={editStatus} />}
        </Form.Item>
        <Statistics />
        <GoBack onSumbit={editStatus ? undefined : onSumbit} />
      </Form>
    </Spin>
  );
};

export default EditPurchaseOrder;
