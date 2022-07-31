import { useRequest } from 'ahooks';
import Status from '@/layout/Status';
import Search from '@/components/Search';
import { BtnEditDel } from '@/layout/Button';
import EditRole from './components/EditRole';
import { toTime, listToTree } from '@/utils/format';
import { UserAddOutlined } from '@ant-design/icons';
import { Form, Card, Table, Button, message } from 'antd';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePageTurning, useGetDetails, useCategorys } from '@/hooks';
import { getRoleList, removeRole, getPermissionList } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONFIG_ANTD_COMP } from '@/config/format';

import type { TypeSystemRole } from '@/interface/system/role';

/**
 * @name Role 角色管理
 */
const Role = () => {

  const [id, setId] = useState<number>();
  const [window, setWindow] = useState(false);

  const { STATUS } = useCategorys();
  const [search] = Form.useForm<TypeSystemRole.QueryList>();

  const { data, loading, run } = useRequest(getRoleList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const { value: permissionTree } = useGetDetails(async () => {
    const list = await getPermissionList({ status: ENUM_COMMON.STATUS.ACTIVATE });
    return listToTree(list);
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
      {
        name: 'name',
        label: '角色名称',
        type: Search.ENUM.COMP_TYPE.INPUT
      },
      {
        name: 'permissionId',
        label: '权限关联',
        list: permissionTree as [],
        type: Search.ENUM.COMP_TYPE.TREE_SELECT,
        props: { fieldNames: CONFIG_ANTD_COMP.CASCADER_FIELD_PERMISSION }
      },
      {
        name: 'status',
        label: '角色状态',
        list: STATUS?.LIST,
        type: Search.ENUM.COMP_TYPE.SELECT
      }
    ]
  ), [STATUS, permissionTree]);

  const columns = [
    { title: '角色名称', dataIndex: 'name' },
    {
      title: '状态', dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <Status status={key} />
    },
    { title: '创建时间', dataIndex: 'createTime', render: toTime },
    { title: '描述', dataIndex: 'remark' },
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
