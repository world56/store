import React from 'react';
import Cookies from 'js-cookie';
import UploadAvatar from './Avatar';

import { TOKEN_KEY } from "@/config/user";

/**
 * @name uploadHeaders 上传文件header
 */
export function uploadHeaders() {
  return {
    Authorization: Cookies.get(TOKEN_KEY)!
  }
}


interface TypeUploadsProps {
  /** @param max 限制最大上传数量 默认为1个 */
  readonly max?: number;
}

/**
 * @name Uploads 上传文件
 */
class Uploads extends React.Component<TypeUploadsProps> {

  /**
   * @name Avatar 上传头像
   */
  static Avatar = UploadAvatar;

  render() {
    return (
      <></>
    );
  }

};


export default Uploads;
