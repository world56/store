import styles from '../index.styl';
import { AlertOutlined } from '@ant-design/icons';

/**
 * @name Hint 警告提示
 */
const Hint = () => (
  <div className={styles.hint}>
    <AlertOutlined />
    &nbsp;警告！本开源商城付款全当赞助！不退钱！
  </div>
);

export default Hint;
