import { ICON } from './config';
import { isVoid } from '@/utils';
import styles from './index.module.sass';
import { Tooltip, Popconfirm, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { EyeOutlined, DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { ENUM_COMMON } from '@/enum/common';
import { STATIC_RESOURCE } from '@/config/request';

import type { TypeCommon } from '@/interface/common';

interface TypeCloudListProps<T = TypeCommon.File> {
  list: T[];
  onRemove?(val: T, i: number, type: ENUM_COMMON.UPLOAD_STATUS): void;
};

/**
 * @name List 资源列表
 */
const List: React.FC<TypeCloudListProps> = ({ list, onRemove }) => {

  function preview(v: TypeCommon.File) {
    window.open(`${STATIC_RESOURCE}/${v.path}`);
  };

  function onDelete(val: TypeCommon.File, i: number, type: ENUM_COMMON.UPLOAD_STATUS) {
    if (val.status !== ENUM_COMMON.UPLOAD_STATUS.LOADING) {
      onRemove?.(val, i, type)
    } else {
      message.warning('不能操作正在上传中的文件')
    }
  };

  return (
    <ul className={styles.list}>
      {list.map((v, i) => {
        const isDone = isVoid(v.status) || v.status === ENUM_COMMON.UPLOAD_STATUS.SUCCESS;
        const isDel = v.status === ENUM_COMMON.UPLOAD_STATUS.DELETE;
        return <li key={v.id || i} className={isDel ? styles.onDel : styles.item}>
          {isDel ?
            <div onClick={() => onDelete?.(v, i, ENUM_COMMON.UPLOAD_STATUS.SUCCESS)}>
              <EyeInvisibleOutlined />
              <Tooltip title='点击恢复'>
                <span>删除文件后，需提交生效</span>
              </Tooltip>
            </div>
            : <>
              <div>
                {isDone ?
                  <img src={ICON[v.type] ? ICON[v.type] : `${STATIC_RESOURCE}/${v.path}`} alt="#" /> :
                  <LoadingOutlined />}
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
                  <Popconfirm title='确定删除？' onConfirm={() => onDelete(v, i, ENUM_COMMON.UPLOAD_STATUS.DELETE)}>
                    <DeleteOutlined title='删除' />
                  </Popconfirm>
                  : null}
              </div>

            </>}
        </li>
      })}
    </ul>
  );
};

export default List;
