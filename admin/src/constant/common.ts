import { ENUM_COMMON } from "@/enum/common";

/**
 * @name CONSTANT_COMMON 常量-公共
 */
export namespace CONSTANT_COMMON {
  /**
   * @param STATUS 状态
   */
  export const STATUS = {
    OBJ: {
      [ENUM_COMMON.STATUS.ACTIVATE]: "激活",
      [ENUM_COMMON.STATUS.FREEZE]: "冻结",
    },
    LIST: [
      { id: ENUM_COMMON.STATUS.ACTIVATE, name: "激活" },
      { id: ENUM_COMMON.STATUS.FREEZE, name: "冻结" },
    ],
  };

  /**
   * @name FILE_TYPE 文件类型
   */
  export const FILE_TYPE = {
    OBJ: {
      [ENUM_COMMON.FILE_TYPE.IMAGE]: "图片",
      [ENUM_COMMON.FILE_TYPE.VIDEO]: "视频",
      [ENUM_COMMON.FILE_TYPE.AUDIO]: "音频",
      [ENUM_COMMON.FILE_TYPE.DOCUMENT]: "文档",
      [ENUM_COMMON.FILE_TYPE.COMPRESSED]: "压缩文件",
      [ENUM_COMMON.FILE_TYPE.OTHER]: "其他",
    },
    LIST: [
      { id: ENUM_COMMON.FILE_TYPE.IMAGE, name: "图片" },
      { id: ENUM_COMMON.FILE_TYPE.VIDEO, name: "视频" },
      { id: ENUM_COMMON.FILE_TYPE.AUDIO, name: "音频" },
      { id: ENUM_COMMON.FILE_TYPE.DOCUMENT, name: "文档" },
      { id: ENUM_COMMON.FILE_TYPE.COMPRESSED, name: "压缩文件" },
      { id: ENUM_COMMON.FILE_TYPE.OTHER, name: "其他" },
    ],
  };
}
