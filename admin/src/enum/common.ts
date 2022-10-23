/**
 * @name ENUM_COMMON 枚举-通用枚举
 */
export namespace ENUM_COMMON {
  /**
   * @name STATUS 状态
   * @param FREEZE 冻结
   * @param ACTIVATE 激活
   */
  export enum STATUS {
    FREEZE,
    ACTIVATE,
  }

  /**
   * @name FILE_TYPE 文件类型
   * @param OTHER 其他类型
   * @param IMAGE 图片
   * @param VIDEO 视频
   * @param AUDIO 音频
   * @param DOCUMENT 文本
   * @param COMPRESSED 压缩文件
   */
  export enum FILE_TYPE {
    OTHER,
    IMAGE,
    VIDEO,
    AUDIO,
    DOCUMENT,
    COMPRESSED,
  }

  /**
   * @name UPLOAD_STATUS 文件上传状态
   */
  export enum UPLOAD_STATUS {
    ERROR,
    SUCCESS,
    LOADING,
    DELETE,
  }

  /**
   * @name LOG_MODULE 日志模块
   * @param PURCHASE 采购模块
   */
  export enum LOG_MODULE {
    PURCHASE,
  }

  /**
   * @name COLOR
   * @param BLACK 灰色
   * @param GREY 灰色
   * @param BLUE 浅蓝
   * @param GREEN 浅绿
   * @param RED 浅红
   * @param YELLOW 浅黄
   * @param ORANGE 橙色
   * @param PURPLE 紫色
   */
  export enum COLOR {
    BLACK = "#000000d9",
    GREY = "#696969",
    BLUE = "#1890ff",
    GREEN = "#67c23a",
    RED = "#f56c6c",
    YELLOW = "#e6a23c",
    ORANGE = "#ff8c00",
    PURPLE = "#800080",
  }
}
