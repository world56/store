import { useStore } from "@/hooks";
import { message, Table } from "antd";
import { Btn } from "@/layout/Button";
import { toTime } from '@/utils/format';
import { removeFiles } from '@/api/common';
import { STATIC_RESOURCE } from '@/config/request';

import { ENUM_COMMON } from "@/enum/common";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeCommon } from "@/interface/common";

interface TypeFilesTableProps {
  /** @param list 文件列表 */
  list?: TypeCommon.File[];
  onCreate?: Function;
};

/**
 * @name FilesTable 文件表格
 */
const FilesTable: React.FC<TypeFilesTableProps> = ({ list, onCreate }) => {

  const { category: { FILE_TYPE } } = useStore();

  function preview(val: TypeCommon.File) {
    window.open(`${STATIC_RESOURCE}/${val.path}`);
  };

  async function onRemove(val: TypeCommon.File) {
    await removeFiles({ ids: [val.id] });
    message.success('操作成功');
    onCreate?.();
  };

  const column = [
    {  title: '文件名', dataIndex: 'name' },
    {
      width: 150,
      title: '文件类型',
      dataIndex: 'type',
      render: (type: ENUM_COMMON.FILE_TYPE) => FILE_TYPE?.OBJ[type]
    },
    {
      title: '上传人',
      width: 150,
      dataIndex: 'user',
      render: (val: TypeCommon.File['user']) => val?.name
    },
    { title: '上传时间', dataIndex: 'createTime', render: toTime },
    {
      key: 'id',
      title: '操作',
      render: (row: TypeCommon.File) => (
        <>
          <Btn onClick={() => preview(row)}>查看</Btn>
          {onCreate ? <Btn
            confirmTips
            type='danger'
            onClick={() => onRemove(row)}>
            删除
          </Btn> : null}
        </>
      )
    },

  ];

  return (
    <Table rowKey={DB_PRIMARY_KEY} columns={column} dataSource={list} pagination={false} />
  );
};

export default FilesTable