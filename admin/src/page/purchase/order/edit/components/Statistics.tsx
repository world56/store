import { Form } from 'antd';
import { OrderPriceQuantity } from '@/components/Details';

/**
 * @name Statistics 统计
 */
const Statistics: React.FC = () => (
  <Form.Item shouldUpdate>
    {(props) => {
      const products = props.getFieldValue('products');
      const [total, price] = OrderPriceQuantity.calculation(products);
      return <OrderPriceQuantity price={price} total={total} />
    }}
  </Form.Item>
);

export default Statistics;
