import { useRequest } from 'ahooks';
import Search from '@/components/Search';
import { BtnEditDel } from '@/layout/Table';
import EditRole from './components/EditRole';
import StatusColor from '@/layout/StatusColor';
import { UserAddOutlined } from '@ant-design/icons';
import { timestampToTime, listToTree } from '@/utils';
import { usePageTurning, useGetDetails } from '@/hooks';
import { Form, Card, Table, Button, message } from 'antd';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRoleList, removeRole, getPermissionTree } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONFIG_ANTD_COMP } from '@/config/format';
import { CONSTANT_COMMON } from '@/constant/common';

import type { TypeSystemRole } from '@/interface/system/role';


/**
 * @name Role 角色管理
 */
const Role = () => {

  const [id, setId] = useState<number>();
  const [window, setWindow] = useState(false);

  const { data, loading, run } = useRequest(getRoleList, { manual: true });
  const [search] = Form.useForm<TypeSystemRole.QueryList>();

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const { value: permissionTree } = useGetDetails(async () => {
    return listToTree(await getPermissionTree());
  }, [true]);

  const initialize = useCallback(async () => {
    const values = await search?.validateFields();
    return run({ ...values, pageSize, currentPage });
    // eslint-disable-next-line
  }, [window, search, pageSize, currentPage, run]);

  const openEditModal = useCallback(() => {
    window && setId(undefined);
    setWindow(!window);
  }, [window]);

  async function remove(id: number) {
    await removeRole({ id });
    message.success('操作成功');
    initialize();
  };

  const edit = useCallback((id: number) => {
    setId(id);
    openEditModal();
  }, [openEditModal]);

  const query = useMemo(() => (
    [
      { key: 'name', name: '角色名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
      {
        key: 'permissionId',
        name: '权限关联',
        list: permissionTree as [],
        type: ENUM_COMMON.COMPONENT_TYPE.TREE_SELECT,
        props: { fieldNames: CONFIG_ANTD_COMP.CASCADER_FIELD_PERMISSION }
      },
      {
        key: 'status',
        name: '角色状态',
        list: CONSTANT_COMMON.LIST_STATUS,
        type: ENUM_COMMON.COMPONENT_TYPE.SELECT
      }
    ]
  ), [permissionTree]);

  const columns = [
    { title: '角色名称', key: 'name', dataIndex: 'name' },
    {
      title: '状态', key: 'status', dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <StatusColor status={key} />
    },
    {
      title: '创建时间', key: 'createTime',
      dataIndex: 'createTime', render: timestampToTime
    },
    { title: '描述', key: 'remark', dataIndex: 'remark' },
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      dataIndex: DB_PRIMARY_KEY,
      render: (id: string) => <BtnEditDel value={id} onEdit={edit} onRemove={remove} />
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
        loading={loading}
        pagination={pagination}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list} />
      <EditRole
        id={id}
        visible={window}
        onClose={openEditModal}
        permissionTree={permissionTree} />
    </Card>
  );
};

export default Role;
