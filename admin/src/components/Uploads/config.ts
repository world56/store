import ICON_OTHER from "@/resource/OTHER.png";
import ICON_AUDIO from "@/resource/AUDIO.png";
import ICON_VIDEO from "@/resource/VIDEO.png";
import ICON_DOCUMENT from "@/resource/DOCUMENT.png";
import ICON_COMPRESSED from "@/resource/COMPRESSED.png";
import { ENUM_COMMON } from "@/enum/common";

export const ICON = {
  [ENUM_COMMON.FILE_TYPE.IMAGE]: undefined,
  [ENUM_COMMON.FILE_TYPE.OTHER]: ICON_OTHER,
  [ENUM_COMMON.FILE_TYPE.AUDIO]: ICON_AUDIO,
  [ENUM_COMMON.FILE_TYPE.VIDEO]: ICON_VIDEO,
  [ENUM_COMMON.FILE_TYPE.DOCUMENT]: ICON_DOCUMENT,
  [ENUM_COMMON.FILE_TYPE.COMPRESSED]: ICON_COMPRESSED,
};
