import { useAsyncFn } from 'react-use';
import Search from '@/components/Search';
import { timestampToTime } from '@/utils';
import EditRole from './components/EditRole';
import { UserAddOutlined } from '@ant-design/icons';
import { getRoleList, removeRole } from '@/api/system';
import { useState, useEffect, useCallback } from 'react';
import { Form, Card, Table, Button, Badge, Popconfirm, message } from 'antd';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { ENUM_ADMIN_SYSTEM } from '@/enum/system';
import { CONSTANT_SYSTEM } from '@/constant/system';

import type { TypeSystemRole } from '@/interface/system/role';

const query = [
  { key: DB_PRIMARY_KEY, name: '角色ID', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'name', name: '角色名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  {
    key: 'status',
    name: '角色状态',
    list: CONSTANT_SYSTEM.LIST_ROLE_STATUS,
    type: ENUM_COMMON.COMPONENT_TYPE.SELECT
  }
];

/**
 * @name Role 角色管理
 */
const Role = () => {

  const [id, setId] = useState<string>();
  const [window, setWindow] = useState(false);

  const [data, fetch] = useAsyncFn(getRoleList);
  const [search] = Form.useForm<TypeSystemRole.ReqRoleList>();

  const initialize = useCallback(async () => {
    const values = await search?.validateFields();
    return fetch(values);
    // 开启、打开弹窗都初始化一次
    // eslint-disable-next-line
  }, [window, search, fetch]);

  const openEditModal = useCallback(() => {
    window && setId(undefined);
    setWindow(!window);
  }, [window]);

  async function remove(_id: string) {
    await removeRole({ _id });
    message.success('操作成功');
    initialize();
  }

  const edit = useCallback((_id: string) => {
    setId(_id);
    openEditModal();
  }, [openEditModal]);

  const columns = [
    {
      title: 'ID',
      width: 100,
      key: DB_PRIMARY_KEY,
      dataIndex: DB_PRIMARY_KEY
    },
    { title: '角色名称', key: 'name', dataIndex: 'name' },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (key: ENUM_ADMIN_SYSTEM.ROLE_STATUS) => {
        const isSucess = key === ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN ? 'success' : 'error';
        return (
          <span className={isSucess}>
            <Badge status={isSucess} />
            {CONSTANT_SYSTEM.KEY_VALUE_ROLE_STATUS[key]}
          </span>
        );
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 180,
      dataIndex: 'createTime',
      render: timestampToTime
    },
    { title: '描述', key: 'description', dataIndex: 'description' },
    {
      title: '操作',
      key: '_id',
      dataIndex: '_id',
      render: (_id: string) => (
        <>
          <span onClick={() => edit(_id)} className='processing cp m-r-5'>编辑</span>
          <Popconfirm title='确定删除该角色？删除后无法恢复！' onConfirm={() => remove(_id)}>
            <span className='error cp'>删除</span>
          </Popconfirm>
        </>
      )
    },
  ];

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Card title='角色管理'>

      <Search form={search} columns={query} onSearch={initialize}>
        <Button onClick={openEditModal}>
          <UserAddOutlined /> 新增角色
        </Button>
      </Search>

      <Table
        columns={columns}
        loading={data.loading}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data.value} />

      <EditRole id={id} visible={window} onClose={openEditModal} />

    </Card>
  );
};

export default Role;
