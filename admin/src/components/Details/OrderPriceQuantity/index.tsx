import { calculation } from './utils';
import styles from './index.module.sass';

interface TypeOrderPriceQuantityProps extends React.FC<{
  /** @param total 总数 */
  total?: React.Key;
  /** @param price 总价 */
  price?: React.Key;
}> {
  calculation: typeof calculation;
};

/**
 * @name OrderPriceQuantity 统计订单价格、数量
 */
const OrderPriceQuantity: TypeOrderPriceQuantityProps = ({ total, price }) => (
  <div className={styles.statistics}>
    <span>统计</span>
    <div>
      <span><span>采购总数：</span> {total} 个</span>
      <span><span>采购总价：</span> {price} 元</span>
    </div>
  </div>
);

OrderPriceQuantity.calculation = calculation;

export default OrderPriceQuantity;
