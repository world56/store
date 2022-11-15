import React from 'react';
import { Popconfirm } from 'antd';
import styles from './index.module.sass';

const BUTTON_COLOR = {
  default: "#1890ff",
  success: "#52c41a",
  danger: "#f56c6c",
  warning: "#e6a23c",
};

export interface TypeBtnProps {
  /** 
   * @param  confirmTips 操作提示（确认后触发onClick） 
   */
  confirmTips?: string | boolean;
  /** 
   * @name onClick 点击事件
   */
  onClick?: () => void | void;
  /** 
   * @param type 按钮类型（颜色）
   */
  type?: keyof typeof BUTTON_COLOR;
  /**
   * @param show 是否显示按钮
   */
  show?: boolean;
  children?: React.ReactNode;
};

/**
 * @name Btn 按钮（蓝色）
 * @description 纯text按钮 通常用于点击交互场景
 */
const Btn: React.FC<TypeBtnProps> = ({
  onClick,
  children,
  confirmTips,
  show = true,
  type = 'default',
}) => {

  function onConfirm(e?: React.MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    onClick?.();
  };

  const btn = (
    <button
      type='button'
      className={styles.btn}
      style={{ color: BUTTON_COLOR[type] }}
      onClick={confirmTips ? undefined : onConfirm}>
      {children}
    </button>
  );

  return show ? confirmTips ?
    <Popconfirm
      title={confirmTips === true ? '确认操作？' : confirmTips}
      onConfirm={onConfirm}>{btn}</Popconfirm>
    : btn : null;
};

export default Btn;
