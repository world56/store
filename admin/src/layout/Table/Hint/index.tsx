import { Tooltip } from 'antd';
import styles from './index.styl';

import type { TooltipProps } from 'antd/lib';

interface TypeHintProps extends Omit<TooltipProps, 'title'> {
  /** @param width 容器最大宽度 */
  width: number;
  /** @param title 内容与提示信息 */
  title?: string;
};

const Hint: React.FC<TypeHintProps> = ({
  title,
  children,
  width: maxWidth,
  ...props
}) => (
  <Tooltip title={title} {...props}>
    <div style={{ maxWidth }} className={styles.layout}>
      <p>{children || '-'}</p>
    </div>
  </Tooltip>
);

export default Hint;
