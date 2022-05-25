import { Popconfirm } from 'antd';
import styles from './index.module.sass';

const BUTTON_COLOR = {
  default: "#1890ff",
  success: "#52c41a",
  danger: "#f56c6c",
  warning: "#e6a23c",
};

export interface TypeBtnProps {
  /** @param  confirmTips 操作提示（确认后触发onClick） */
  confirmTips?: string | boolean;
  /** @name onClick 点击事件 */
  onClick?: () => void | void;
  /** @param type 按钮类型（颜色） */
  type?: keyof typeof BUTTON_COLOR;
  children?: React.ReactNode;
};

/**
 * @name Btn 按钮 纯text按钮
 */
const Btn: React.FC<TypeBtnProps> = ({
  onClick,
  children,
  confirmTips,
  type = 'default',
}) => {

  const btn = (
    <button
      type='button'
      className={styles.btn}
      onClick={() => onClick?.()}
      style={{ color: BUTTON_COLOR[type] }}>
      {children}
    </button>
  );

  return confirmTips ?
    <Popconfirm
      title={confirmTips === true ? '确认删除？' : confirmTips}
      onConfirm={() => onClick?.()}>{btn}</Popconfirm>
    : btn;
};

export default Btn;
