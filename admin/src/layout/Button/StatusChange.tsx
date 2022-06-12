import { Btn } from '.';
import { Popconfirm } from 'antd';

import { ENUM_COMMON } from "@/enum/common";

interface TypeStatusChangeProps {
  /** @param status 状态 */
  status: ENUM_COMMON.STATUS;
  onClick?(): void;
  /** @param  confirmTips 操作提示（确认后触发onClick） */
  confirmTips?: string | boolean;
};

/**
 * @name StatusChange 状态改变 
 */
const StatusChange: React.FC<TypeStatusChangeProps> = ({ status, confirmTips, onClick }) => {
  const color = status === ENUM_COMMON.STATUS.ACTIVATE ? 'danger' : 'success';

  const btn = <Btn
    type={color} onClick={confirmTips ? undefined : () => onClick?.()}>
    {status === ENUM_COMMON.STATUS.ACTIVATE ? '冻结' : '激活'}
  </Btn>

  return confirmTips ?
    <Popconfirm
      title={confirmTips === true ? '确认操作?' : confirmTips}
      onConfirm={() => onClick?.()}>{btn}</Popconfirm>
    : btn;
};

export default StatusChange;
