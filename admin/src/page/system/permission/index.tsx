import { useAsyncFn } from 'react-use';
import Search from '@/components/Search';
import { usePageTurning } from '@/hooks';
import { BtnEditDel } from '@/layout/Table';
import StatusColor from '@/layout/StatusColor';
import { KeyOutlined } from '@ant-design/icons';
import { useEffect, useState, useCallback } from 'react';
import EditPermission from './components/EditPermission';
import { Card, Form, Table, Button, message } from 'antd';
import { getPermissionList, removePermission } from '@/api/system';

import { ENUM_SYSTEM } from '@/enum/system';
import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_SYSTEM } from '@/constant/system';
import { CONSTANT_COMMON } from '@/constant/common';

import type { TypeSystemPermission } from '@/interface/system/permission';

const query = [
  { key: 'code', name: '权限Key', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'name', name: '权限名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  {
    key: 'status',
    name: '权限状态',
    list: CONSTANT_COMMON.LIST_STATUS,
    type: ENUM_COMMON.COMPONENT_TYPE.SELECT
  },
];

/**
 * @name Permission 权限列表
 */
const Permission = () => {

  const [id, setId] = useState<number>();
  const [window, setWindow] = useState(false);

  const [data, fetch] = useAsyncFn(getPermissionList);
  const [search] = Form.useForm<TypeSystemPermission.QueryList>();

  const pagination = usePageTurning(data.value?.count);
  const { pageSize, currentPage } = pagination;

  const initialize = useCallback(async () => {
    const param = await search.validateFields();
    param.pageSize = pageSize;
    param.currentPage = currentPage;
    fetch(param);
  }, [fetch, search, pageSize, currentPage]);

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
    { title: '权限名称', key: 'name', dataIndex: 'name' },
    { title: '权限Key', key: 'code', dataIndex: 'code' },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: (key: ENUM_SYSTEM.PERMISSION_TYPE) => CONSTANT_SYSTEM.KEY_VALUE_PERMISSION_TYPE[key]
    },
    {
      title: '当前状态',
      key: 'status',
      dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <StatusColor status={key} />
    },
    { title: '备注', key: 'remark', dataIndex: 'remark' },
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      dataIndex: DB_PRIMARY_KEY,
      render: (_id: string) => <BtnEditDel value={_id} onEdit={edit} onRemove={remove} />
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
        loading={data.loading}
        rowKey={DB_PRIMARY_KEY}
        pagination={pagination}
        dataSource={data.value?.list} />
      <EditPermission id={id} visible={window} onClose={onClose} />
    </Card>
  );
};

export default Permission;
