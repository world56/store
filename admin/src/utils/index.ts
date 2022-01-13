import dayjs from "dayjs";
import { CONFIG_TIME_FORMAT } from "@/config/format";

/**
 * @name isVoid 判断值是否为void
 */
export function isVoid(param: unknown): param is boolean {
  return param === undefined || param === null || param === "";
}

/**
 * @name timestampToTime 时间戳转成标准时间格式
 * @description 只能用作于时间戳
 * @returns {string} 输出格式为 YYYY-MM-DD HH:mm:ss
 */
export function timestampToTime(timestamp?: number): string {
  return timestamp ? dayjs(timestamp).format(CONFIG_TIME_FORMAT.STANDARD) : "-";
}
