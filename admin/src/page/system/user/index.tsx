import { useRequest } from 'ahooks';
import { Btn } from '@/layout/Button';
import { toTime } from '@/utils/format';
import Search from '@/components/Search';
import EditUserInfo from '@/components/EditUserInfo';
import { useCategorys, usePageTurning } from '@/hooks';
import { Card, Form, Table, Button, Modal } from 'antd';
import { EditStatus, Switch } from '@/components/Status';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { ExclamationCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { getUserList, freezeAdminUser, resetAdminUserPwd } from '@/api/system';

import { ENUM_SYSTEM } from '@/enum/system';
import { DB_PRIMARY_KEY } from '@/config/db';

import type { TypeAdminUser } from '@/interface/system/user';
import type { TypeEditStatusProps } from '@/components/Status/EditStatus';

interface TypeQueryUserList extends TypeAdminUser.QueryList {
  time?: number[];
};

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name AdminUser 系统用户管理
 */
const AdminUser = () => {

  const { DEPARTMENT, STATUS } = useCategorys([
    ENUM_CATEGORY.ROLE,
    ENUM_CATEGORY.DEPARTMENT
  ]);

  const [search] = Form.useForm<TypeQueryUserList>();

  const [editParam, setEditParam] = useState({ visible: false });
  const [editStatus, setEditStatus] = useState<TypeEditStatusProps>();

  const { data, loading, run } = useRequest(getUserList, { manual: true });
  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  const onChangeEdit = useCallback((row?: TypeAdminUser.DTO) => {
    setEditParam(s => ({ visible: !s.visible, id: row?.id }));
    !row && initializa();
  }, [initializa]);

  function onUserStatusChange(row?: TypeAdminUser.DTO) {
    setEditStatus({ id: row?.id, status: row?.status });
    row || initializa();
  };

  async function resetPwd(row: TypeAdminUser.DTO) {
    Modal.confirm({
      title: '您确定要执行该操作？',
      icon: <ExclamationCircleOutlined />,
      content: '该用户密码将重置，仅用于用户忘记密码的场景',
      async onOk() {
        const { id } = row;
        const psd = await resetAdminUserPwd({ id });
        Modal.confirm({
          title: '重制密码成功！',
          icon: <SmileOutlined />,
          cancelButtonProps: { className: 'none' },
          content: `请牢记您的新密码“${psd}”,重新登陆后请尽快更改。`
        })
      },
    });
  };

  const query = useMemo(() => [
    { name: 'name', label: '用户名称', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'account', label: '登陆账号', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'phone', label: '联系电话', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'departmentId',
      label: '所属部门',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: DEPARTMENT?.LIST
    },
    {
      name: 'status',
      label: '用户状态',
      list: STATUS?.LIST,
      type: Search.ENUM.COMP_TYPE.SELECT
    },
    { name: 'createTime', label: '注册时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
  ], [DEPARTMENT, STATUS]);

  const columns = [
    { title: '用户名称', key: 'name', dataIndex: 'name' },
    { title: '登陆账号', key: 'account', dataIndex: 'account' },
    { title: '联系电话', key: 'phone', dataIndex: 'phone' },
    {
      title: '当前状态',
      key: DB_PRIMARY_KEY,
      render: (row: TypeAdminUser.DTO) => (
        <Switch checked={row.status} onClick={() => onUserStatusChange(row)} />
      )
    },
    {
      title: '注册时间',
      key: 'createTime',
      dataIndex: 'createTime',
      width: 180,
      render: toTime
    },
    {
      title: '操作', key: DB_PRIMARY_KEY,
      render: (row: TypeAdminUser.DTO) => (
        <>
          <Btn onClick={() => onChangeEdit(row)}>编辑</Btn>
          <Btn onClick={() => resetPwd(row)}>重置密码</Btn>
        </>
      )
    }
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='用户管理'>
      <Search form={search} columns={query} onSearch={initializa}>
        <Button onClick={() => onChangeEdit()}>
          新增用户 <UsergroupAddOutlined />
        </Button>
      </Search>
      <Table
        columns={columns}
        loading={loading}
        rowKey={DB_PRIMARY_KEY}
        pagination={pagination}
        dataSource={data?.list} />
      <EditUserInfo
        {...editParam}
        onClose={onChangeEdit}
        type={ENUM_SYSTEM.EDIT_USER.ADMIN} />
      <EditStatus
        {...editStatus}
        requestFn={freezeAdminUser}
        onClose={onUserStatusChange}
      />
    </Card>
  );
};

export default AdminUser;
