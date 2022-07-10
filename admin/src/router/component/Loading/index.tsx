import { Spin } from 'antd';
import styles from './index.module.sass';

const { loadingView, sping } = styles;

const PageLoading = () => (
  <div className={loadingView}>
    <Spin size="large" className={sping} />
  </div>
);

export default PageLoading;