import Badge from './Badge';
import { isVoid } from '@/utils';
import styles from './index.module.sass';

import { ENUM_COMMON } from '@/enum/common';
import { CONSTANT_COMMON } from '@/constant/common';

interface StatusColorProps {
  className?: string;
  status?: number;
  matching?: Record<number, {
    color?: string;
    text: string;
  }>;
};

const DEFAULT_MATCHING = {
  [ENUM_COMMON.STATUS.FREEZE]: {
    color: ENUM_COMMON.STATUS_COLOR_TYPE.DANGER,
    text: CONSTANT_COMMON.STATUS.OBJ[ENUM_COMMON.STATUS.FREEZE]
  },
  [ENUM_COMMON.STATUS.ACTIVATE]: {
    color: ENUM_COMMON.STATUS_COLOR_TYPE.SUCCESS,
    text: CONSTANT_COMMON.STATUS.OBJ[ENUM_COMMON.STATUS.ACTIVATE]
  },
}

/**
 * @name StatusColor 当前状态
 * @description 冻结状态 显示红色、激活状态 显示绿色。
 */
const StatusColor: React.FC<StatusColorProps> = ({
  status,
  className,
  matching = DEFAULT_MATCHING
}) => {
  const conf = isVoid(status) ? undefined : matching[status!];
  return (
    <span style={{ color: conf?.color }} className={`${styles.layout} ${className || ''}`}>
      {conf?.color ? <Badge color={conf?.color} /> : null}
      {conf?.text || '-'}
    </span>
  );
};

export default StatusColor;
