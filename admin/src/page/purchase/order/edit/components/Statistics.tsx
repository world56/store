import { Form } from 'antd';
import { StatisticsBanner } from '@/components/Details';

/**
 * @name Statistics 统计
 */
const Statistics: React.FC = () => (
  <Form.Item shouldUpdate>
    {(props) => {
      const products = props.getFieldValue('products');
      const [total, price] = StatisticsBanner.calculation(products);

      const statisticsItems =[
        { title: '采购总数', value: `${total} 个` },
        { title: '采购总价', value: `${price} 元` },
      ];

      return <StatisticsBanner items={statisticsItems} />
    }}
  </Form.Item>
);

export default Statistics;
