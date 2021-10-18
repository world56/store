import { useAsyncFn } from 'react-use';
import Search from '@/components/Search';
import { getRoleList } from '@/api/system';
import EditRole from './components/EditRole';
import { Form, Card, Table, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeSystemRole } from '@/interface/system/role';

const query = [
  { key: 'name', name: '角色名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'status', name: '角色状态', type: ENUM_COMMON.COMPONENT_TYPE.SELECT }
];

const columns = [
  { title: '角色名称', key: 'name1', dataIndex: 'name1' },
  { title: '状态', key: 'name2', dataIndex: 'name2' },
  { title: '创建时间', key: 'name3', dataIndex: 'name3' },
  { title: '描述', key: 'name13', dataIndex: 'name13' },
  { title: '操作', key: 'name4', dataIndex: 'name4' },
];

/**
 * @name Role 角色管理
 */
const Role = () => {

  const [window, setWindow] = useState(false);
  const [data, fetch] = useAsyncFn(getRoleList);
  const [search] = Form.useForm<TypeSystemRole.ReqRoleList>();

  const initialize = useCallback(() => {
    const values = search?.getFieldsValue();
    return fetch(values);
  }, [search, fetch]);

  const openEditModal = useCallback(() => {
    setWindow(b => !b);
  }, []);

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
        dataSource={data.value} />
      <EditRole visible={window} onClose={openEditModal} />
    </Card>
  );
};

export default Role;
