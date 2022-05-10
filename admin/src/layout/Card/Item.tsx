import styles from './index.styl'
import { CodepenOutlined } from '@ant-design/icons';

const Item = () => {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <span><CodepenOutlined /></span>
        <div className={styles.title}>
          <span>1号1号1号1号1号1号</span>
        </div>
      </div>
      <ul className={styles.ctx}>
        <li>
          <span>商品数量：</span>
          1302
        </li>
        <li>
          <span>货架数量：</span>
          102 
        </li>
        <li>
          <span>存储状态：</span>
          正常
        </li>
      </ul>
    </div>
  )
}

export default Item