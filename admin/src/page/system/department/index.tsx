import { useRequest } from 'ahooks';
import Search from '@/components/Search';
import EditDep from './components/EditDep';
import { BtnEditDel } from '@/layout/Button';
import { TeamOutlined } from '@ant-design/icons';
import { useCategorys, usePageTurning } from '@/hooks';
import { Card, Form, Table, Button, message } from 'antd';
import { getDepartmentList, removeDepartment } from '@/api/system';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { type TypeSystemDepartment } from '@/interface/system/department';

import { DB_PRIMARY_KEY } from '@/config/db';

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Department 部门管理
 */
const Department = () => {

  const { ADMIN_USER } = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

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
    setId(id);
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
  };

  const query = useMemo(() => [
    { name: 'name', label: '部门名称', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'userId',
      label: '部门员工',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: ADMIN_USER?.LIST
    }
  ], [ADMIN_USER]);

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