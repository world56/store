import { Card, Descriptions } from "antd";
import styles from '../index.module.sass';

const { Item } = Descriptions;

interface TypeWarehousingProduct { };

/**
 * @name Purchase 采购信息
 */
const Purchase:React.FC<TypeWarehousingProduct> = () => {
  return (
    <Card title='采购信息'>
      <Descriptions bordered column={1} className={styles.basic}>
        <Item label="流程发起人">@@@</Item>
        <Item label="供应商">@@@</Item>
        <Item label="运输方式">@@@</Item>
        <Item label="物流（快递）单号">@@@</Item>
      </Descriptions>
    </Card>
  );
};

export default Purchase;
