import { Drawer } from "@/layout/PopUp";
import styles from '../index.module.sass';

import type { TypePopUpProps } from "@/layout/PopUp/Drawer";

export interface TypeLogsContainer extends Partial<TypePopUpProps> { };

/**
 * @name LogsContainer 日志列表查看容器（方式）
 */
const LogsContainer: React.FC<TypeLogsContainer> = ({
  loading,
  visible,
  onCancel,
  children,
}) => {
  return onCancel ? <Drawer
    title='日志记录'
    loading={loading}
    visible={visible}
    onCancel={onCancel}
    className={styles.drawer}>
    {children}
  </Drawer> : <div className={styles.list}>{children}</div>
};

export default LogsContainer;
