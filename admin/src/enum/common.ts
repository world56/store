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
   * @name UPLOAD 上传文件类型
   * @param PICTURE 图片
   */
  export enum UPLOAD {
    PICTURE,
  }

  /**
   * @name STATUS_COLOUR_NUMBER
   * @param DEFAULT 默认色号 #1890ff 浅蓝
   * @param SUCCESS 成功色号 #67c23a 浅绿
   * @param DANGER  危险色号 #f56c6c 浅红
   * @param WARNING 警告色号 #e6a23c 浅黄
   */
  export enum STATUS_COLOUR_NUMBER {
    DEFAULT = "#1890ff",
    SUCCESS = "#67c23a",
    DANGER = "#f56c6c",
    WARNING = "#e6a23c",
  }
}
