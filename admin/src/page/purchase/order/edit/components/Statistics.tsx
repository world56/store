import { Form } from 'antd';
import { OrderPriceQuantity } from '@/components/Details';

/**
 * @name Statistics 统计
 */
const Statistics: React.FC = () => (
  <Form.Item shouldUpdate>
    {(props) => {
      const products = props.getFieldValue('products');
      return <OrderPriceQuantity {...OrderPriceQuantity.calculation(products)} />
    }}
  </Form.Item>
);

export default Statistics;
