import { Badge } from 'antd';

import { ENUM_COMMON } from '@/enum/common';
import { CONSTANT_COMMON } from '@/constant/common';

interface StatusColorProps {
  /** @param status 当前状态 0冻结 1激活 */
  status?: ENUM_COMMON.STATUS;
};

/**
 * @name StatusColor 当前状态
 * @description 冻结状态 显示红色、激活状态 显示绿色。
 */
const StatusColor: React.FC<StatusColorProps> = ({
  status
}) => {
  const isSucess = status === ENUM_COMMON.STATUS.ACTIVATE ? 'success' : 'error';
  return (
    <span className={isSucess}>
      <Badge status={isSucess} />
      {CONSTANT_COMMON.STATUS.OBJ[status!]}
    </span>
  );
};

export default StatusColor;
