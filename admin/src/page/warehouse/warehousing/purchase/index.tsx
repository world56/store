import { Form, Spin } from 'antd';
import { useRequest } from "ahooks";
import { serviceToForm } from './utils';
import { GoBack } from "@/layout/Button";
import styles from './index.module.sass';
import Purchase from './components/Purchase';
import { useParams } from "react-router-dom";
import BasicInfo from "./components/BasicInfo";
import { getWarehousingInfo } from "@/api/warehouse";
import ProductConfirm from "./components/ProductConfirm";
import { getPurchaseOrderDetails } from '@/api/purchase';

import type { FormInstance } from 'antd/es';
import type { EditWarehousingProductDetails } from './utils';
import type { TypePurchaseOrder } from "@/interface/purchase/order";

export interface TypeEditWarehousingProducts {
  products: EditWarehousingProductDetails[];
};

export interface TypeWarehousingPurchaseQuery {
  form?: FormInstance<TypeEditWarehousingProducts>;
};

/**
 * @name WarehousingPurchase 采购入库确认
 */
const WarehousingPurchase = () => {

  const { id, orderId } = useParams();
  const [form] = Form.useForm<TypeEditWarehousingProducts>();

  function toSaveFormData(data: TypePurchaseOrder.DTO) {
    const { remark, ...values } = serviceToForm(data);
    form.setFieldsValue(values);
  };

  const { data = [], loading } = useRequest(async () => {
    const data = await Promise.all([
      getWarehousingInfo({ id: Number(id) }),
      getPurchaseOrderDetails({ id: Number(orderId) })
    ]);
    toSaveFormData(data[1]);
    return data;
  }, { refreshDeps: [id, orderId] });

  const [warehousing, purchase] = data;

  async function onSumbit() {
    const values = await form.validateFields();
    console.log('@-val', values);
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} className={styles.layout}>
        <BasicInfo data={warehousing} remark={purchase?.remark} />
        <Purchase data={purchase} />
        <ProductConfirm form={form} total={purchase?.total} />
        <GoBack onSumbit={onSumbit} top={28} bottom={24} />
      </Form>
    </Spin>
  );
};

export default WarehousingPurchase;
