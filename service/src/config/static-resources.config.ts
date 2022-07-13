import { resolve } from 'path';

import { ENUM_COMMON } from '@/enum/common';

// 视频
export const VIDEO_SUFFIX = [
  '.MP4',
  '.RMVB',
  '.AVI',
  '.MKV',
  '.MPG',
  '.MPEG',
  '.3GP',
];
// 图片
export const IMAGE_SUFFIX = [
  '.JPG',
  '.PNG',
  '.GIF',
  '.SVG',
  '.BMP',
  '.JPEG',
  '.TIFF',
  '.WEBP',
];
// 音频
export const AUDIO_SUFFIX = [
  '.CD',
  '.MP3',
  '.OGG',
  '.WMV',
  '.ASF',
  '.RM',
  '.APE',
  '.WAV',
  '.FLAC',
  '.APE',
  '.CUE',
  '.PCM',
];
// 压缩文件
export const COMPRESS_SUFFIX = ['.7Z', '.RAR', '.ZIP', '.TAR', '.GZIP', '.ISO'];
// 文本
export const TEXT_SUFFIX = [
  '.DOC',
  '.DOCX',
  '.XLS',
  '.XLSX',
  '.PPT',
  '.PPTX',
  '.TXT',
  '.MD',
  '.DOX',
  '.HTM',
  '.HTML',
  '.WPS',
  '.XML',
  '.CSV',
  '.PDF',
  '.XPS',
  '.BMP',
  '.POTX',
  '.PPAM',
  '.PPSX',
  '.PPTX',
];

function toObj(list: string[], type: ENUM_COMMON.FILE_TYPE) {
  const obj = {};
  list.forEach((v) => (obj[v] = type));
  return obj;
}

export default () => ({
  path: resolve(__dirname, '../../', 'resource'),
  type: {
    ...toObj(VIDEO_SUFFIX, ENUM_COMMON.FILE_TYPE.VIDEO),
    ...toObj(IMAGE_SUFFIX, ENUM_COMMON.FILE_TYPE.IMAGE),
    ...toObj(AUDIO_SUFFIX, ENUM_COMMON.FILE_TYPE.AUDIO),
    ...toObj(COMPRESS_SUFFIX, ENUM_COMMON.FILE_TYPE.COMPRESSED),
    ...toObj(TEXT_SUFFIX, ENUM_COMMON.FILE_TYPE.DOCUMENT),
  },
});
