import { Form, Tooltip } from 'antd';
import styles from '../../index.module.sass';
import { StatisticsBanner } from '@/components/Details';

import type { TypeProductConfirmProps } from '.';

/**
 * @name Statistics 统计预计到货量、实际到货量
 */
const Statistics: React.FC<Pick<TypeProductConfirmProps, 'total'>> = ({ total }) => (
  <Form.Item shouldUpdate noStyle>
    {(props) => {
      const products = props.getFieldValue('products') || [];
      const [actualTotal] = StatisticsBanner.calculation(products, 'actualQuantity');
      const inconsistent = Number(total) !== actualTotal;
      return <div className={styles.statistics}>
        <span>
          <span>预计到货量：</span>
          {total || 0}
        </span>
        <Tooltip
          open={inconsistent}
          title='需要与采购核对实际数量'
          getPopupContainer={e => e}>
          <span style={{ color: inconsistent ? 'red' : '' }}>
            <span>实际入库量：</span>
            {actualTotal}
          </span>
        </Tooltip>
      </div>
    }}
  </Form.Item>
);

export default Statistics;
