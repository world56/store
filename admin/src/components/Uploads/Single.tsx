import Cookies from 'js-cookie';
import { Component } from 'react';
import styles from './index.module.sass';
import { UserOutlined } from '@ant-design/icons';
import { Upload, Avatar, Tooltip, message, Spin } from 'antd';

import { TOKEN_KEY } from "@/config/user";
import { API_URL_UPLOAD } from '@/api/common';
import { STATIC_RESOURCE } from '@/config/request';

import { type UploadProps } from 'antd/lib/upload';
import type { TypeCommon } from '@/interface/common';
import { MessageType } from 'antd/es/message/interface';

interface TypeUploadsProps<T = TypeCommon.File> {
  /** @param type avatar 头像 other 任意格式文件 */
  type?: 'avatar' | 'other';
  value?: T;
  onFile?(val: T): void;
  onChange?(url: string): void;
};

interface TypeUploadsState {
  load: boolean;
};

/**
 * @name Single 单个文件
 */
class Single extends Component<TypeUploadsProps, TypeUploadsState> {

  state = { load: false };

  private loadingMsg?: MessageType;

  static defaultProps = { type: 'image' };

  private readonly headers = {
    Authorization: Cookies.get(TOKEN_KEY)!
  };

  private format: ReadonlyArray<string> = ['image/jpg', 'image/jpeg', 'image/png'];

  private isBtnStyle = () => {
    return !this.props.onChange && this.props.onFile;
  };

  private beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const { type } = this.props;
    if (type === 'avatar') {
      if (!this.format.includes(file.type)) {
        message.warning('仅支持图片格式（jpg、jpeg、png）');
        return false;
      }
    }
    if (!(file.size / 1024 / 1024 < 50)) {
      message.warning('图片最大不得超过50MB');
      return false;
    } else {
      if (this.isBtnStyle()) {
        this.loadingMsg = message.loading('正在上传文件')
      }
      this.setState({ load: true });
      return true;
    }
  }

  protected onChange: UploadProps['onChange'] = (e) => {
    if (e.file.status === 'done' && e.file?.response?.content) {
      this.props.onChange?.(`${STATIC_RESOURCE}/${e.file?.response?.content.path}`);
      this.props.onFile?.(e.file.response?.content as TypeCommon.File);
      this.setState({ load: false });
      this.loadingMsg?.();
    } else if (e.file.status === 'error') {
      message.error('上传失败');
      this.loadingMsg?.();
      this.setState({ load: false });
    }
  };

  render() {
    const { load } = this.state;
    const { value, type } = this.props;
    const isOther = type === 'other';
    return (
      <Upload<TypeCommon.File>
        headers={this.headers}
        action={API_URL_UPLOAD}
        onChange={this.onChange}
        className={styles.single}
        beforeUpload={this.beforeUpload}
        showUploadList={false}>
        {isOther ? <span className='btn'>上传</span> : <Tooltip title='点击上传头像'>
          <Spin spinning={load} tip='正在上传'>
            <Avatar size={128} icon={<UserOutlined />} src={<>{value}</>} />
          </Spin>
        </Tooltip>}
      </Upload>
    );
  };

};

export default Single;
