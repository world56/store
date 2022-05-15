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
   * @param IMAGE 图片
   * @param VIDEO 视频
   * @param AUDIO 音频
   * @param DOCUMENT 文本
   * @param COMPRESSED 压缩文件
   * @param OTHER 其他类型
   */
  export enum FILE_TYPE {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
    DOCUMENT = 'DOCUMENT',
    COMPRESSED = 'COMPRESSED',
    OTHER = 'OTHER',
  }
}
