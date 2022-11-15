import { Empty } from 'antd';
import { Btn } from '@/layout/Button';

interface TypeRefreshProps {
  /**
   * @name onClick 刷新按钮
   */
  onClick(): void;
};

/**
 * @name Refresh 数据为空 点击按钮重新获取数据
 */
const Refresh: React.FC<TypeRefreshProps> = ({ onClick }) => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
    <>
      暂无日志 <Btn onClick={onClick}>刷新</Btn>
    </>
  } />
);

export default Refresh;
