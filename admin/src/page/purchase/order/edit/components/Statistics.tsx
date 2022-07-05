import { Form } from 'antd';
import styles from '../index.module.sass';
import { calculateTotal } from '../utils';

/**
 * @name Statistics 统计
 */
const Statistics: React.FC = () => (
  <Form.Item shouldUpdate>
    {(props) => {
      const products = props.getFieldValue('products');
      const { total, totalPrice } = calculateTotal(products);
      return <div className={styles.statistics}>
        <span>统计</span>
        <div>
          <span><span>采购总数：</span> {total} 个</span>
          <span><span>采购总价：</span> {totalPrice} 元</span>
        </div>
      </div>
    }}
  </Form.Item>
);

export default Statistics;
