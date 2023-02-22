import { toCategorys } from "@/utils/format";

import { ENUM_COMMON } from "@/enum/common";

/**
 * @name CONSTANT_COMMON 常量-公共
 */
export namespace CONSTANT_COMMON {
  /**
   * @param STATUS 状态
   */
  export const STATUS = toCategorys([
    {
      id: ENUM_COMMON.STATUS.ACTIVATE,
      name: "激活",
      color: ENUM_COMMON.COLOR.GREEN,
    },
    {
      id: ENUM_COMMON.STATUS.FREEZE,
      name: "冻结",
      color: ENUM_COMMON.COLOR.RED,
    },
  ]);

  /**
   * @name FILE_TYPE 文件类型
   */
  export const FILE_TYPE = toCategorys([
    { id: ENUM_COMMON.FILE_TYPE.IMAGE, name: "图片" },
    { id: ENUM_COMMON.FILE_TYPE.VIDEO, name: "视频" },
    { id: ENUM_COMMON.FILE_TYPE.AUDIO, name: "音频" },
    { id: ENUM_COMMON.FILE_TYPE.DOCUMENT, name: "文档" },
    { id: ENUM_COMMON.FILE_TYPE.COMPRESSED, name: "压缩文件" },
    { id: ENUM_COMMON.FILE_TYPE.OTHER, name: "其他" },
  ]);
}
