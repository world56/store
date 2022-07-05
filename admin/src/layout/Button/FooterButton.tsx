import { Button } from "antd";
import styles from './index.module.sass';
import { SyncOutlined } from '@ant-design/icons';

interface TypeFooterButtonProps {
  onSumbit?(): void;
  onCancel?(): void;
  onCancelText?: string;
  onRefresh?(): void;
  align?: 'left' | 'right' | 'center';
};

/**
 * @name FooterButton 弹窗功能按钮
 */
const FooterButton: React.FC<TypeFooterButtonProps> = ({
  children,
  onSumbit,
  onCancel,
  onRefresh,
  onCancelText,
  align = 'right',
}) => (
  <div className={styles.footer} style={{ justifyContent: align }}>
    {children}
    {onRefresh ? <Button onClick={onRefresh} icon={<SyncOutlined />}> 刷新 </Button> : null}
    {onSumbit ? <Button onClick={onSumbit} type='primary'>提交</Button> : null}
    <Button onClick={onCancel}>{onCancelText ??= onSumbit ? '取消' : '关闭'}</Button>
  </div>
);

export default FooterButton;
