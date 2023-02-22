import { useRequest } from "ahooks";
import { serviceToForm } from './utils';
import { GoBack } from "@/layout/Button";
import styles from './index.module.sass';
import { Form, Spin, message } from 'antd';
import Purchase from './components/Purchase';
import BasicInfo from "./components/BasicInfo";
import { showCountTheGoods } from '../list/utils';
import ProductConfirm from "./components/ProductConfirm";
import { useNavigate, useParams } from "react-router-dom";
import { confirmWarehousing, getWarehousingInfo } from "@/api/warehouse";

import type { FormInstance } from 'antd/es';
import type { TypeWarehouseWarehousing } from '@/interface/warehouse/warehousing';

export interface TypeWarehousingPurchaseQuery {
  form?: FormInstance<TypeWarehouseWarehousing.ConfirmPurchaseWarehousing>;
};

/**
 * @name WarehousingPurchase 采购入库确认
 */
const WarehousingPurchase = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm<TypeWarehouseWarehousing.ConfirmPurchaseWarehousing>();

  const { data, loading } = useRequest(async () => {
    const values = await getWarehousingInfo({ id: Number(id) });
    form.setFieldsValue(serviceToForm(values));
    return values;
  }, { refreshDeps: [id] });

  async function onSubmit() {
    const values = await form.validateFields();
    await confirmWarehousing(values);
    message.success('提交成功，审核成功后生效');
    navigate(-1);
  };

  const isEdit = showCountTheGoods(data?.status);

  return (
    <Spin spinning={loading}>
      <Form form={form} className={styles.layout}>
        <BasicInfo data={data} />
        <Purchase data={data?.order} />
        <ProductConfirm form={form} isEdit={isEdit} total={data?.order?.total} />
        <GoBack
          top={28}
          bottom={24}
          onSubmitTips='确认清点无误？'
          onSubmit={isEdit ? onSubmit : undefined}
        />
      </Form>
    </Spin>
  );
};

export default WarehousingPurchase;
