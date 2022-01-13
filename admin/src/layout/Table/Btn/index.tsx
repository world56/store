import styles from './index.styl';

const BUTTON_COLOR = {
  default: "#1890ff",
  success: "#52c41a",
  danger: "#f56c6c",
  warning: "#e6a23c",
};

export interface TypeBtnProps {
  onClick?: () => void | void;
  type?: keyof typeof BUTTON_COLOR;
};

/**
 * @name Btn 按钮 纯text按钮
 */
const Btn: React.FC<TypeBtnProps> = ({
  onClick,
  children,
  type = 'default',
}) => (
  <button
    className={styles.layout}
    onClick={() => onClick?.()}
    style={{ color: BUTTON_COLOR[type] }}>
    {children}
  </button>
);

export default Btn;
