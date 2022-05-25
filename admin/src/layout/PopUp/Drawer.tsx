import { Drawer, Spin } from 'antd';
import styles from './index.module.sass';
import { FooterButton } from '../Button';

import type { DrawerProps } from 'antd/lib/drawer';

interface TypePopUpProps extends Omit<DrawerProps, 'onClose'> {
  loading?: boolean;
  onSumbit?(): void;
  onCancel?(): void;
};

const Drawers: React.FC<TypePopUpProps> = ({
  onSumbit,
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
    onSumbit?.();
  };

  return (
    <Drawer
      {...props}
      onClose={onClose}
      footer={<FooterButton onSumbit={onOk} onCancel={onClose} />}
      className={`${styles.drawer} ${className ? className : ''}`}>
      <Spin spinning={loading}>
        {children}
      </Spin>
    </Drawer>
  );
};

export default Drawers;
