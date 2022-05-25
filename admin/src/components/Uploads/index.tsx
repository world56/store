import React from 'react';
import List from './List';
import { isVoid } from '@/utils';
import UploadAvatar from './Avatar';
import { notification } from 'antd';
import styles from './index.module.sass';
import ICON_FOLDER from '@/resource/folder.png';
import { WarningOutlined } from '@ant-design/icons';
import { removeFiles, uploadFile } from '@/api/common';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '@/interface/common';

interface TypeUploadsProps {
  /** @param max 限制最大上传数量 默认为1个 */
  readonly max?: number;
  value?: TypeCommon.NetDisk[];
  onChange?(val: TypeCommon.NetDisk[]): void;
};

interface TypeUploadsState {
  list: TypeCommon.NetDisk[];
};

/**
 * @name Uploads 上传文件
 */
class Uploads extends React.Component<TypeUploadsProps, TypeUploadsState> {

  /**
   * @name Avatar 上传头像
   */
  static readonly Avatar = UploadAvatar;

  private index = 0;

  static defaultProps = { value: [] };

  private readonly fileSize = 1024 * 1024 * 30;

  constructor(props: TypeUploadsProps) {
    super(props);
    this.state = { list: [] };
  };

  private uploadData = (list: TypeCommon.NetDisk[]) => {
    const { value } = this.props;
    if (value) {
      this.props.onChange?.(this.state.list.filter(v => {
        return isVoid(v.status) || v.status === ENUM_COMMON.UPLOAD_STATUS.SUCCESS;
      }));
    } else {
      this.setState({ list });
    }
  };

  static getDerivedStateFromProps(nextProps: TypeUploadsProps, prevState: TypeUploadsState) {
    if (nextProps.value) {
      const cache: TypeCommon.GenericObject<TypeCommon.NetDisk> = {};
      [...prevState.list, ...nextProps.value].forEach((v) => {
        if (v.status !== ENUM_COMMON.UPLOAD_STATUS.DELETE) {
          cache[v.id] = v
        }
      })
      return { list: Object.values(cache) };
    }
    return { list: prevState.list };
  };

  uploadFile = async (file: File, id: number) => {
    const { list } = this.state;
    try {
      const data = await uploadFile(file);
      for (const val of list) {
        if (val.id === id) {
          val.id = data.id;
          val.path = data.path
          val.type = data.type
          val.userId = data.userId;
          val.status = ENUM_COMMON.UPLOAD_STATUS.SUCCESS;
          break
        }
      }
    } catch (e) {
      for (const val of list) {
        if (val.id === id) {
          val.status = ENUM_COMMON.UPLOAD_STATUS.ERROR;
          break
        }
      }
    } finally {
      this.setState({ list: [...list] }, () => this.uploadData([...list]));
    }
  };

  /**
   * @name filterFiles 校验文件合法性
   */
  private filterFiles = (files: FileList): File[] => {
    return Array.prototype.filter.call(files, (f: File) => {
      if (f.size >= this.fileSize) {
        notification.warn({
          message: '警告',
          icon: <WarningOutlined />,
          description: <><strong>{f.name}</strong> 文件超过 <strong>最大限制30MB</strong> ，请检查后在尝试上传。</>,
        });
        return false;
      }
      return true;
    });
  };

  private startUploading = (files: File[]) => {
    const adds = files.map(f => {
      const { name } = f;
      const id = ++this.index;
      return { id, name, path: '', type: ENUM_COMMON.FILE_TYPE.IMAGE, status: ENUM_COMMON.UPLOAD_STATUS.LOADING };
    });
    this.setState({ list: [...this.state.list, ...adds] }, () => {
      files.forEach((v, i) => this.uploadFile(v, adds[i].id))
    });
  };

  onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = this.filterFiles(e.target.files!);
    this.startUploading(files);
  };

  onRemove = async (val: TypeCommon.NetDisk, i: number) => {
    const { list } = this.state;
    list[i].status = ENUM_COMMON.UPLOAD_STATUS.DELETE
    this.setState({ list }, () => this.uploadData(list));
    typeof val.id === 'number' && removeFiles({ ids: [val.id] });
  };

  render() {
    const { list } = this.state;
    return (
      <div className={styles.layout}>
        <div className={styles.container}>
          <img src={ICON_FOLDER} alt='#' />
          <p>点击此处选择上传的文件</p>
          <p>单文件最大不得超过30MB</p>
          <input multiple onChange={this.onChange} type='file' />
        </div>
        <List list={list} onRemove={this.onRemove} />
      </div>
    );
  };

};


export default Uploads;
