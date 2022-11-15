import { Result, Button } from 'antd';
import styles from './index.module.sass';

/**
 * @name Error 找不到页面
 */
const Error = () => (
  <div className={styles.status}>
    <Result
      status="500"
      title="500"
      subTitle="出现未知的错误，请联系系统管理员"
      extra={<Button type="primary">返回上一级</Button>}
    />
  </div>
);

export default Error;
