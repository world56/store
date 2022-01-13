import styles from '../index.styl';
import { Col, Button } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

interface OperatingButtonProps {
  /** @param onSumbit 提交 */
  onSumbit(): void;
  /** @param onEmpty 重制清空初始化 */
  onEmpty(): void;
};

/**
 * @name OperatingButton 操作按钮
 */
const OperatingButton: React.FC<OperatingButtonProps> = ({
  onEmpty,
  onSumbit,
  children
}) => (
  <Col className={styles.searchBtn}>
    <Button onClick={onSumbit} type="primary">
      <SearchOutlined /> 搜索
    </Button>
    <Button danger onClick={onEmpty} className="formSearchClear">
      <DeleteOutlined /> 重置
    </Button>
    {children ? children : null}
  </Col>
);

export default OperatingButton;
