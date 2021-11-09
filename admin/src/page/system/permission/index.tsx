import { useAsyncFn } from 'react-use';
import Search from '@/components/Search';
import { usePageTurning } from '@/hooks';
import StatusColor from '@/layout/StatusColor';
import { KeyOutlined } from '@ant-design/icons';
import { Card, Form, Table, Button } from 'antd';
import { getPermissionList } from '@/api/system';
import TabaleEditDel from '@/layout/TabaleEditDel';
import { useEffect, useState, useCallback } from 'react';
import EditPermission from './components/EditPermission';

import { ENUM_SYSTEM } from '@/enum/system';
import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_SYSTEM } from '@/constant/system';

import type { TypeSystemPermission } from '@/interface/system/permission';

const query = [
  { key: DB_PRIMARY_KEY, name: '权限ID', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'code', name: '权限Key', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'name', name: '权限名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
];

/**
 * @name Permission 权限列表
 */
const Permission = () => {

  const [id] = useState<string>();
  const [window, setWindow] = useState(false);

  const [data, fetch] = useAsyncFn(getPermissionList);
  const [search] = Form.useForm<TypeSystemPermission.ReqPermissionList>();

  const pagination = usePageTurning(data.value?.total);
  const { pageSize, currentPage } = pagination;

  const initialize = useCallback(async () => {
    const param = await search.validateFields();
    param.pageSize = pageSize;
    param.currentPage = currentPage;
    fetch(param);
  }, [fetch, search, pageSize, currentPage]);

  const onClose = useCallback(() => {
    setWindow(b => !b);
    initialize();
  }, [initialize]);

  const columns = [
    { title: 'ID', width: 100, key: DB_PRIMARY_KEY, dataIndex: DB_PRIMARY_KEY },
    { title: '权限名称', key: 'name', dataIndex: 'name' },
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
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      dataIndex: DB_PRIMARY_KEY,
      render: (_id: string) => <TabaleEditDel />
    },
  ];

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Card title='权限列表'>
      <Search form={search} columns={query} onSearch={initialize}>
        <Button onClick={onClose}>
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
