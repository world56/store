import { Button, Popconfirm } from "antd";
import styles from './index.module.sass';
import { SyncOutlined } from '@ant-design/icons';

export interface TypeFooterButtonProps {
  /**
   * @name onSubmit 提交、保存按钮
   */
  onSubmit?(): void;
  /**
   * @name onCancel 点击取消、关闭按钮
   */
  onCancel?(): void;
  /**
   * @param onCancelText 取消、关闭 按钮文字（可自定义）
   */
  onCancelText?: string;
  /**
   * @name onRefresh 刷新按钮
   */
  onRefresh?(): void;
  /**
   * @param align 按钮方向布局
   */
  align?: 'left' | 'right' | 'center';
  /**
   * @param onSubmitTips 提交按钮 二次确认提示
   */
  onSubmitTips?: string;
  /**
   * @param loading 加载状态（提交按钮无法点击）
   */
  loading?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * @name FooterButton 弹窗功能按钮
 */
const FooterButton: React.FC<TypeFooterButtonProps> = ({
  loading,
  children,
  onSubmit,
  onCancel,
  onRefresh,
  onCancelText,
  onSubmitTips,
  align = 'right',
  style = {},
}) => {

  const BTN_SUMBIT = onSubmit ? (onSubmitTips ? <Popconfirm title={onSubmitTips} onConfirm={onSubmit}>
    <Button loading={loading} type='primary'>提交</Button>
  </Popconfirm> : <Button loading={loading} onClick={onSubmit} type='primary'>提交</Button>) : null;

  return (
    <div className={styles.footer} style={{ justifyContent: align, ...style }}>
      {children}
      {onRefresh ? <Button loading={loading} onClick={onRefresh} icon={<SyncOutlined />}> 刷新 </Button> : null}
      {BTN_SUMBIT}
      <Button onClick={onCancel}>{onCancelText ??= onSubmit ? '取消' : '关闭'}</Button>
    </div>
  );

}
export default FooterButton;
