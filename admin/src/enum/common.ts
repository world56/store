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
   * @name STATUS_COLOR_TYPE
   * @param DEFAULT 默认色号 #1890ff 浅蓝
   * @param SUCCESS 成功色号 #67c23a 浅绿
   * @param DANGER  危险色号 #f56c6c 浅红
   * @param WARNING 警告色号 #e6a23c 浅黄
   */
  export enum STATUS_COLOR_TYPE {
    DEFAULT = "#1890ff",
    SUCCESS = "#67c23a",
    DANGER = "#f56c6c",
    WARNING = "#e6a23c",
  }
}
