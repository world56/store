import Badge from './Badge';
import { isVoid } from '@/utils';
import styles from './index.module.sass';

import { ENUM_COMMON } from '@/enum/common';
import { CONSTANT_COMMON } from '@/constant/common';

import { TypeCommon } from '@/interface/common';

interface TypeMatching extends Pick<TypeCommon.DTO, 'id' | 'name'> {
  color: ENUM_COMMON.COLOR;
};

interface TypeStatusProps {
  className?: string;
  style?: React.CSSProperties;
  /** 
   * @param status 状态值 
   */
  status?: number;
  /** 
   * @param 状态值对应的 适配色、id、name
   * @description 默认创建对象的key都是字符串
   */
  matching?: Record<string, TypeMatching>;
};


/**
 * @name Status 当前状态
 * @description 默认：冻结状态 显示红色、激活状态 显示绿色。
 */
const Status: React.FC<TypeStatusProps> = ({
  status,
  className,
  style = {},
  matching = CONSTANT_COMMON.STATUS.OBJ
}) => {
  const conf = isVoid(status) ? undefined : matching[status!];
  return (
    <span style={{ color: conf?.color, ...style }} className={`${styles.layout} ${className || ''}`}>
      {conf?.color ? <Badge color={conf?.color} /> : null}
      {conf?.name || '-'}
    </span>
  );
};


export default Status;
