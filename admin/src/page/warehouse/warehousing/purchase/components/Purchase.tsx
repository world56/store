import { useCategorys } from "@/hooks";
import { Card, Descriptions } from "antd";
import styles from '../index.module.sass';

import type { TypePurchaseOrder } from "@/interface/purchase/order";

const { Item } = Descriptions;

interface TypePurchaseBasicInfo {
  data?: TypePurchaseOrder.DTO;
};

/**
 * @name Purchase 采购信息
 */
const Purchase: React.FC<TypePurchaseBasicInfo> = ({ data }) => {

  const { SUPPLIER_SHIPPING_METHOD } = useCategorys();

  return (
    <Card title='采购信息'>
      <Descriptions bordered column={1} className={styles.basic}>
        <Item label="流程发起人">{data?.creator?.name}</Item>
        <Item label="供应商">{data?.supplier?.name}</Item>
        <Item label="运输方式">
          {SUPPLIER_SHIPPING_METHOD?.OBJ[data?.shippingMethod!]}
        </Item>
        <Item label="物流（快递）公司">{data?.logisticsCompany?.name}</Item>
        <Item label="物流（快递）单号">{data?.shippingNoteNumber || '暂无'}</Item>
      </Descriptions>
    </Card>
  );
};

export default Purchase;
