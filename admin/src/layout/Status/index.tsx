import Badge from './Badge';
import { isVoid } from '@/utils';
import styles from './index.module.sass';

import { COLOR_TYPE } from './conf';
import React from 'react';

interface TypeStatusProps extends React.FC<{
  className?: string;
  style?: React.CSSProperties;
  status?: number;
  matching?: Record<number, {
    color?: string;
    text: string;
  }>;
}> {
  type: typeof COLOR_TYPE;
}

/**
 * @name Status 当前状态
 * @description 默认：冻结状态 显示红色、激活状态 显示绿色。
 */
const Status: TypeStatusProps = ({
  status,
  className,
  style = {},
  matching = COLOR_TYPE.DEFAULT_MATCHING
}) => {
  const conf = isVoid(status) ? undefined : matching[status!];
  return (
    <span style={{ color: conf?.color, ...style }} className={`${styles.layout} ${className || ''}`}>
      {conf?.color ? <Badge color={conf?.color} /> : null}
      {conf?.text || '-'}
    </span>
  );
};

Status.type = COLOR_TYPE;

export default Status;
