import { useAsyncFn } from 'react-use';
import { Form, Card, Table } from 'antd';
import Search from '@/components/Search';
import { getRoleList } from '@/api/system';
import { useEffect, useCallback } from 'react';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeSystemRole } from '@/interface/system/role';

const searchColumns = [
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

  const [data, fetch] = useAsyncFn(getRoleList);
  const [search] = Form.useForm<TypeSystemRole.ReqRoleList>();

  const initialization = useCallback(() => {
    const values = search?.getFieldsValue();
    return fetch({ ...values });
  }, [search, fetch]);

  useEffect(() => {
    initialization();
  }, [initialization]);

  return (
    <Card title='角色管理'>
      <Search
        form={search}
        columns={searchColumns}
        onSearch={initialization} />
      <Table
        columns={columns}
        loading={data.loading}
        dataSource={data.value} />
    </Card>
  );
};

export default Role;
