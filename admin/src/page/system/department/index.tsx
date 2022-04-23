import { useRequest } from 'ahooks';
import { usePageTurning } from '@/hooks';
import Search from '@/components/Search';
import EditDep from './components/EditDep';
import { BtnEditDel } from '@/layout/Table';
import { TeamOutlined } from '@ant-design/icons';
import { Card, Form, Table, Button, message } from 'antd';
import { getDepartmentList, removeDepartment } from '@/api/system';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { type TypeSystemDepartment } from '@/interface/system/department';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';


/**
 * @name Department 部门管理 department
 */
const Department = () => {

  const [id, setId] = useState<number>();
  const [visible, setVisible] = useState(false);

  const [search] = Form.useForm<TypeSystemDepartment.DTO>();

  const { data, loading, run } = useRequest(getDepartmentList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    run({ ...values, pageSize, currentPage });
  }, [search, run, pageSize, currentPage]);

  function editDep(id?: number) {
    setId(id)
    setVisible(b => !b);
  };

  const closeEdit = useCallback(() => {
    setId(undefined);
    setVisible(b => !b);
    initializa();
  }, [initializa])

  async function onRemove(id: number) {
    await removeDepartment({ id });
    message.success('操作成功');
    initializa();
  }

  const query = useMemo(() => (
    [{ key: 'name', name: '部门名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT }]
  ), []);

  const columns = [
    { title: '部门名称', key: 'name', dataIndex: 'name' },
    { title: '描述', key: 'remark', dataIndex: 'remark' },
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      dataIndex: DB_PRIMARY_KEY,
      render: (id: string) => <BtnEditDel value={id} onEdit={editDep} onRemove={onRemove} />
    },
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='部门'>
      <Search form={search} columns={query} onSearch={initializa}>
        <Button onClick={() => editDep()}>
          <TeamOutlined /> 新增部门
        </Button>
      </Search>
      <Table
        columns={columns}
        loading={loading}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list} />
      <EditDep id={id} visible={visible} onClose={closeEdit} />
    </Card>
  );
};


export default memo(Department);