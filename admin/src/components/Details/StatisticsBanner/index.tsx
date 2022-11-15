import { calculation } from './utils';
import styles from './index.module.sass';

interface TypeStatisticalItems {
  /**
   * @param title 统计项标题
   */
  title: string;
  /**
   * @param value 统计项值
   */
  value: React.Key | undefined;

  /**
   * @param className 改变value样式
   */
  className?: string;
}

interface TypeOrderPriceQuantityProps extends React.FC<{
  /**
   * @param items 统计项List
   */
  items: TypeStatisticalItems[];
}> {
  calculation: typeof calculation;
};

/**
 * @name StatisticsBanner 统计订单价格、数量
 */
const StatisticsBanner: TypeOrderPriceQuantityProps = ({ items }) => (
  <div className={styles.statistics}>
    <span className={styles.title}>统计</span>
    <div>
      {items.map(v => <span key={v.title}>
        <span>{v.title}：</span>
        <span className={v.className}>{v.value}</span>
      </span>)}
    </div>
  </div>
);

StatisticsBanner.calculation = calculation;

export default StatisticsBanner;
