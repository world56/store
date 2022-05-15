import { isVoid } from '@/utils';
import styles from './index.styl';
import { Tooltip, Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import { ENUM_COMMON } from '@/enum/common';
import { STATIC_RESOURCE } from '@/config/request';

import type { TypeCommon } from '@/interface/common';

interface TypeCloudListProps<T = TypeCommon.NetDisk> {
  list: T[];
  onRemove?(val: T, i: number): void;
};

/**
 * @name List 资源列表
 */
const List: React.FC<TypeCloudListProps> = ({ list, onRemove }) => {

  function preview(v: TypeCommon.NetDisk) {
    window.open(`${STATIC_RESOURCE}/${v.path}`);
  };

  return (
    <ul className={styles.list}>
      {list.map((v, i) => {
        const isDone = isVoid(v.status) || v.status === ENUM_COMMON.UPLOAD_STATUS.SUCCESS;
        return <li key={v.id || i}>
          <div>
            {isDone ? <img src={`${STATIC_RESOURCE}/${v.path}`} alt="#" /> : <LoadingOutlined />}
          </div>
          <div>
            <p>{isDone ? v.name : '正在上传文件...'}</p>
          </div>
          <div>
            {isDone ? <>
              <Tooltip title='预览'>
                <EyeOutlined onClick={() => preview(v)} />
              </Tooltip>
            </> : null}
            {onRemove ?
              <Popconfirm title='确定删除？' onConfirm={() => onRemove(v, i)}>
                <DeleteOutlined title='删除' />
              </Popconfirm>
              : null}
          </div>
        </li>
      })}
    </ul>
  );
};

export default List;
