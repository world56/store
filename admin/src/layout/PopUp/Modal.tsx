import { Modal as AntdModal, Spin } from 'antd';

import type { ModalProps } from 'antd/lib/modal/Modal';

interface TypeModal extends ModalProps {
  /** @param loading 加载动画 */
  loading?: boolean;
};

/**
 * @name Modal 弹窗
 * @description antd Modal组件 添加了loading属性
 */
const Modal: React.FC<TypeModal> = ({
  children,
  loading = false,
  ...modalProps
}) => (
  <AntdModal confirmLoading={loading} {...modalProps}>
    <Spin spinning={loading}>
      {children}
    </Spin>
  </AntdModal>
);

export default Modal;
