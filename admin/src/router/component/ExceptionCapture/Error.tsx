import { Result } from 'antd';
import styles from './index.module.sass';

/**
 * @name Error 找不到页面
 */
const Error = () => (
  <div className={styles.status}>
    <Result
      status="404"
      title="404"
      subTitle="没有找到对应的页面，请确认地址是否正确" />
  </div>
);

export default Error;
