import { useEffect } from 'react';
import { GoBack } from "@/layout/Button";
import styles from './index.module.sass';
import BasicInfo from "./components/BasicInfo";
import { editPurchaseOrder } from "@/utils/status";
import { useActions, useGetDetails } from '@/hooks';
import { formToServer, serverToForm } from './utils';
import { Card, Form, message, Spin, Input } from "antd";
import SupplierProduct from "./components/SupplierProduct";
import { useNavigate, useSearchParams } from "react-router-dom";
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

  async function onSubmit() {
    const values = await form.validateFields();
    const data = formToServer(values);
    if (id) await updatePurchaseOrder(data);
    else await insertPurchaseOrder(data);
    form.resetFields();
    message.success(id ? '操作成功' : '操作成功，可继续新建采购单');
    id && navigate(-1);
  };

  const editStatus = editPurchaseOrder(value);

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
        <Card title='采购备注'>
          <Form.Item noStyle name='remark'>
            <Input.TextArea placeholder="清输入备注" allowClear rows={4} />
          </Form.Item>
        </Card>
        <GoBack onSubmit={editStatus ? undefined : onSubmit} />
      </Form>
    </Spin>
  );
};

export default EditPurchaseOrder;
