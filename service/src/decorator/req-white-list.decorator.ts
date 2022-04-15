import { SetMetadata } from '@nestjs/common';

export const KEY = 'REQ_WHITE_LIST';

/**
 * @name ReqWhiteList 请求白名单
 */
export const ReqWhiteList = (...args: string[]) => SetMetadata(KEY, true);

ReqWhiteList.KEY = KEY;
