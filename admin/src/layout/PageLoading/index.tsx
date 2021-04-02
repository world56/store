import { Spin } from 'antd';
import style from './index.styl';

const { loadingView, sping } = style;

const PageLoading = (): JSX.Element => (
  <div className={loadingView}>
    <Spin size="large" className={sping} />
  </div>
);

export default PageLoading;