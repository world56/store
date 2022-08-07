import { Form } from 'antd';
import { GoBack } from "@/layout/Button";
import styles from './index.module.sass';
import Purchase from './components/Purchase';
import { useParams } from "react-router-dom";
import Products from "./components/Products";
import BasicInfo from "./components/BasicInfo";

import type { FormInstance } from 'antd/es';
import type { TypeCommon } from "@/interface/common";
import type { EditWarehousingProductDetails } from './utils';

export interface TypeEditWarehousingProducts {
  products: EditWarehousingProductDetails[];
};

export interface TypeWarehousingPurchaseQuery extends TypeCommon.DatabaseMainParameter {
  form?: FormInstance<TypeEditWarehousingProducts>;
}

/**
 * @name WarehousingPurchase 采购入库
 */
const WarehousingPurchase = () => {

  const query = useParams();
  const [form] = Form.useForm<TypeEditWarehousingProducts>();

  const id = Number(query.id);

  async function onSumbit() {
    const values = await form.validateFields();
    console.log('@-val', values);
  };

  return (
    <Form form={form} className={styles.layout}>
      <BasicInfo id={id} />
      <Purchase />
      <Products id={id} form={form} />
      <GoBack onSumbit={onSumbit} />
    </Form>
  );
};

export default WarehousingPurchase;
