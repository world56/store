import { Button } from "antd";
import styles from './index.module.sass';

interface TypeFooterButtonProps {
  onSumbit?(): void;
  onCancel?(): void;
  align?: 'left' | 'right';
};

/**
 * @name FooterButton 弹窗功能按钮
 */
const FooterButton: React.FC<TypeFooterButtonProps> = ({
  onSumbit,
  onCancel,
  children,
  align = 'right',
}) => (
  <div className={styles.footer} style={{ justifyContent: align }}>
    {children}
    {onSumbit ? <Button onClick={onSumbit} type='primary'>提交</Button> : null}
    <Button onClick={onCancel}>{onSumbit ? '取消' : '关闭'}</Button>
  </div>
);

export default FooterButton;
