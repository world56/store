import { useRequest } from 'ahooks';
import Status from '@/layout/Status';
import { useCategorys } from '@/hooks';
import Search from '@/components/Search';
import { listToTree } from '@/utils/format';
import { BtnEditDel } from '@/layout/Button';
import { KeyOutlined } from '@ant-design/icons';
import { useEffect, useState, useCallback } from 'react';
import EditPermission from './components/EditPermission';
import { Card, Form, Table, Button, message } from 'antd';
import { getPermissionList, removePermission } from '@/api/system';

import { ENUM_SYSTEM } from '@/enum/system';
import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_COMMON } from '@/constant/common';

import type { TypeSystemPermission } from '@/interface/system/permission';

const query = [
  { name: 'code', label: '权限Key', type: Search.ENUM.COMP_TYPE.INPUT },
  { name: 'name', label: '权限名称', type: Search.ENUM.COMP_TYPE.INPUT },
  {
    name: 'status',
    label: '权限状态',
    list: CONSTANT_COMMON.STATUS.LIST,
    type: Search.ENUM.COMP_TYPE.SELECT
  },
];

/**
 * @name Permission 权限列表
 */
const Permission = () => {

  const [id, setId] = useState<number>();
  const [window, setWindow] = useState(false);

  const { PERMISSION_TYPE } = useCategorys();

  const { data, loading, run: initialize } = useRequest(async () => {
    const param = await search.validateFields();
    const list = await getPermissionList(param);
    return listToTree(list);
  }, { manual: true });
  const [search] = Form.useForm<TypeSystemPermission.QueryList>();

  const onClose = useCallback((init?: boolean) => {
    init || initialize();
    setId(undefined);
    setWindow(b => !b);
  }, [initialize]);

  async function remove(id: number) {
    await removePermission({ id });
    message.success('删除成功');
    initialize();
  };

  async function edit(id: number) {
    setId(id);
    setWindow(b => !b);
  };

  const columns = [
    { title: 'id', key: 'id', dataIndex: 'id' },
    { title: '权限名称', key: 'name', dataIndex: 'name' },
    { title: '权限Key', key: 'code', dataIndex: 'code' },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: (key: ENUM_SYSTEM.PERMISSION_TYPE) => PERMISSION_TYPE?.OBJ[key]
    },
    {
      title: '当前状态',
      key: 'status',
      dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <Status status={key} />
    },
    { title: '备注', key: 'remark', dataIndex: 'remark' },
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      render: (row: TypeSystemPermission.DTO) => {
        const showEdit = row.fStatus ? edit : undefined;
        return <BtnEditDel value={row.id} onEdit={showEdit} onRemove={remove} />
      }
    },
  ];

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Card title='权限列表'>
      <Search form={search} columns={query} onSearch={initialize}>
        <Button onClick={() => onClose(true)}>
          新增权限 <KeyOutlined />
        </Button>
      </Search>
      <Table
        columns={columns}
        loading={loading}
        pagination={false}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data} />
      <EditPermission id={id} visible={window} onClose={onClose} />
    </Card>
  );
};

export default Permission;
