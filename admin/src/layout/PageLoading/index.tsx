import { Spin } from 'antd';
import styles from './index.styl';

const { loadingView, sping } = styles;

const PageLoading = () => (
  <div className={loadingView}>
    <Spin size="large" className={sping} />
  </div>
);

export default PageLoading;