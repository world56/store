import { Form, Tooltip } from 'antd';
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
        const inconsistent = Boolean(total) && total !== actualTotal;
        return <div className={styles.statistics}>
          <span>
            <span>预计到货量：</span>
            {total || 0}
          </span>
          <Tooltip
            visible={inconsistent}
            title='请与采购确认到货数量'
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
};

export default Statistics;
