import Cookies from 'js-cookie';
import { Component } from 'react';
import styles from './index.styl';
import { UserOutlined } from '@ant-design/icons';
import { Upload, Avatar, Tooltip, message, Spin } from 'antd';

import { TOKEN_KEY } from "@/config/user";
import { API_URL_UPLOAD } from '@/api/common';
import { STATIC_RESOURCE } from '@/config/request';

import { type UploadProps } from 'antd/lib/upload';

interface TypeUploadsProps<T = string> {
  value?: T;
  onChange?(url: T): void;
}

interface TypeUploadsState {
  load: boolean;
};

/**
 * @name UploadAvatar 上传头像
 */
class UploadAvatar extends Component<TypeUploadsProps, TypeUploadsState> {

  state = { load: false };

  private readonly headers = {
    Authorization: Cookies.get(TOKEN_KEY)!
  };

  private format: ReadonlyArray<string> = ['image/jpg', 'image/jpeg', 'image/png'];

  private beforeUpload: UploadProps['beforeUpload'] = (file) => {
    if (!this.format.includes(file.type)) {
      message.warning('仅支持图片格式（jpg、jpeg、png）');
      return false;
    } else if (!(file.size / 1024 / 1024 < 2)) {
      message.warning('图片最大不得超过2MB');
      return false;
    } else {
      this.setState({ load: true });
      return true;
    }
  }

  protected onChange: UploadProps['onChange'] = (e) => {
    if (e.file.status === 'done' && e.file?.response?.content) {
      this.props.onChange?.(`${STATIC_RESOURCE}/${e.file?.response?.content.path}`);
      this.setState({ load: false });
    } else if (e.file.status === 'error') {
      message.error('上传失败');
      this.setState({ load: false });
    }
  };

  render() {
    const { load } = this.state;
    const { value } = this.props;
    return (
      <Upload
        headers={this.headers}
        action={API_URL_UPLOAD}
        onChange={this.onChange}
        className={styles.avatar}
        beforeUpload={this.beforeUpload}
        showUploadList={false}>
        <Tooltip title='点击上传头像'>
          <Spin spinning={load} tip='正在上传'>
            <Avatar size={128} icon={<UserOutlined />} src={value} />
          </Spin>
        </Tooltip>
      </Upload>
    );
  }

};

export default UploadAvatar;
