import { ENUM_COMMON } from '@/enum/common';

/**
 * @name CONSTANT_COMMON 常量-公共
 */
export namespace CONSTANT_COMMON {
  /**
   * @name KEY_VALUE_STATUS 状态
   */
  export const KEY_VALUE_STATUS = Object.freeze(<const>{
    [ENUM_COMMON.STATUS.ACTIVATE]: '激活',
    [ENUM_COMMON.STATUS.FREEZE]: '冻结',
  });

  /**
   * @name LIST_STATUS 状态
   */
  export const LIST_STATUS = Object.freeze(<const>[
    { key: ENUM_COMMON.STATUS.ACTIVATE, value: '激活' },
    { key: ENUM_COMMON.STATUS.FREEZE, value: '冻结' },
  ]);
}
