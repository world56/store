import { Form } from 'antd';
import styles from '../../index.module.sass';
import { OrderPriceQuantity } from '@/components/Details';

import type { TypeProductConfirmProps } from '.';



/**
 * @name Statistics 统计预计到货量、实际到货量
 */
const Statistics: React.FC<Pick<TypeProductConfirmProps, 'total'>> = ({ total }) => {
  return (
    <Form.Item shouldUpdate noStyle>
      {(props) => {
        const products = props.getFieldValue('products') || [];
        const [actualTotal] = OrderPriceQuantity.calculation(products, 'actualQuantity');
        return <div className={styles.statistics}>
          <span>
            <span>预计到货量：</span>
            {total || 0}
          </span>
          <span>
            <span>实际入库量：</span>
            {actualTotal}
          </span>
        </div>
      }}
    </Form.Item>
  );
};

export default Statistics;
