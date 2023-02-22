import { Col, Button } from 'antd';
import styles from '../index.module.sass';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

interface OperatingButtonProps {
  /** @param onSubmit 提交 */
  onSubmit(): void;
  /** @param onEmpty 重制清空初始化 */
  onEmpty(): void;
  children?: React.ReactNode;
};

/**
 * @name OperatingButton 操作按钮
 */
const OperatingButton: React.FC<OperatingButtonProps> = ({
  onEmpty,
  onSubmit,
  children
}) => (
  <Col className={styles.searchBtn}>
    <Button onClick={onSubmit} type="primary" htmlType="submit">
      <SearchOutlined /> 搜索
    </Button>
    <Button danger onClick={onEmpty} htmlType="button" className="formSearchClear">
      <DeleteOutlined /> 重置
    </Button>
    {children ? children : null}
  </Col>
);

export default OperatingButton;
