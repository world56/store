import { Badge } from 'antd';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';

import type { BadgeProps } from 'antd/lib/badge';
import type { TypeCommon } from '@/interface/common';

const COLORS = {
  [ENUM_WAREHOUSE.STATUS.ABNORMAL]: 'error',
  [ENUM_WAREHOUSE.STATUS.NORMAL]: 'success',
  [ENUM_WAREHOUSE.STATUS.FULL_LOAD]: 'error',
  [ENUM_WAREHOUSE.STATUS.STOCKTAKING]: 'warning',
};

interface TypeStatusColorsProps {
  status: ENUM_WAREHOUSE.STATUS;
  enums?: TypeCommon.Dictionaries;
};

/**
 * @name StatusColors 仓位状态
 */
const StatusColors: React.FC<TypeStatusColorsProps> = ({ status, enums }) => (
  <Badge status={COLORS[status] as BadgeProps['status']} text={enums?.OBJ[status]} />
);

export default StatusColors;
