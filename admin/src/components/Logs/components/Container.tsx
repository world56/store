import { Spin } from "antd";
import { Drawer } from "@/layout/PopUp";
import styles from '../index.module.sass';

import type { TypeLogsProps } from '../';
import type { TypePopUpProps } from "@/layout/PopUp/Drawer";

export interface TypeLogsContainer extends Partial<TypePopUpProps>, Pick<TypeLogsProps, 'spacing'> { };

/**
 * @name LogsContainer 日志列表查看容器（方式）
 */
const LogsContainer: React.FC<TypeLogsContainer> = ({
  loading,
  visible,
  spacing,
  onCancel,
  children,
}) => onCancel ? <Drawer
  width={520}
  open={visible}
  title='日志记录'
  loading={loading}
  onCancel={onCancel}
  className={styles.drawer}>
  {children}
</Drawer> : <Spin spinning={loading}>
    <div className={`${styles.list} ${spacing ? styles.spacing : ''}`}>
      {children}
    </div>
  </Spin>;

export default LogsContainer;
