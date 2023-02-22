import { Drawer, Spin } from 'antd';
import styles from './index.module.sass';
import { FooterButton } from '../Button';

import type { DrawerProps } from 'antd/lib/drawer';

export interface TypePopUpProps extends Omit<DrawerProps, 'onClose'> {
  loading?: boolean;
  onSubmit?(): void;
  onCancel?(): void;
};

const Drawers: React.FC<TypePopUpProps> = ({
  onSubmit,
  onCancel,
  children,
  className,
  loading = false,
  ...props
}) => {

  function onClose() {
    onCancel?.();
  };

  function onOk() {
    onSubmit?.();
  };

  return (
    <Drawer
      {...props}
      onClose={onClose}
      footer={<FooterButton onSubmit={onSubmit ? onOk : undefined} onCancel={onClose} />}
      className={`${styles.drawer} ${className ? className : ''}`}>
      <Spin spinning={loading}>
        {children}
      </Spin>
    </Drawer>
  );
};

export default Drawers;
