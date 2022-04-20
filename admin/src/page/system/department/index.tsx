import { useRequest } from 'ahooks';
import { useCallback, useState } from 'react';
import { usePageTurning } from '@/hooks';
import Search from '@/components/Search';
import { BtnEditDel } from '@/layout/Table';
import StatusColor from '@/layout/StatusColor';
import { Card, Form, Table, Button } from 'antd';
import { getDepartmentList } from '@/api/system';
import { TeamOutlined } from '@ant-design/icons';
import { TypeSystemDepartment } from '@/interface/system/department';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_COMMON } from '@/constant/common';
import EditDep from './components/EditDep';

const query = [
  { key: 'name', name: '部门名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  {
    key: 'status',
    name: '部门状态',
    list: CONSTANT_COMMON.LIST_STATUS,
    type: ENUM_COMMON.COMPONENT_TYPE.SELECT
  },
];

/**
 * @name Department 部门管理 department
 */
const Department = () => {

  const [visible, setVisible] = useState(false);

  const [search] = Form.useForm<TypeSystemDepartment.DTO>();

  const { data, loading, run } = useRequest(getDepartmentList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    run({ ...values, pageSize, currentPage });
  }, [search, run, pageSize, currentPage]);

  function editDep() {
    setVisible(b => !b);
  };

  function closeEdit(){
    setVisible(b => !b);
  }

  const columns = [
    { title: '部门名称', key: 'name', dataIndex: 'name' },
    {
      title: '状态', key: 'status', dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <StatusColor status={key} />
    },
    { title: '描述', key: 'remark', dataIndex: 'remark' },
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      dataIndex: DB_PRIMARY_KEY,
      render: (id: string) => <BtnEditDel value={id} />
    },
  ]

  return (
    <Card title='部门'>
      <Search form={search} columns={query} onSearch={initializa}>
        <Button onClick={editDep}>
          <TeamOutlined /> 新增部门
        </Button>
      </Search>
      <Table
        columns={columns}
        loading={loading}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list} />
      <EditDep visible={visible} onClose={closeEdit} />
    </Card>
  );
};

export default Department;