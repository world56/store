import { useRequest } from 'ahooks';
import { Btn } from '@/layout/Table';
import Search from '@/components/Search';
import { timestampToTime } from '@/utils';
import EditUser from './components/EditUser';
import StatusColor from '@/layout/StatusColor';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useActions, usePageTurning, useStore } from '@/hooks';
import { Card, Form, Table, Button, Modal, message } from 'antd';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { ExclamationCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { getUserList, freezeAdminUser, resetAdminUserPwd } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_COMMON } from '@/constant/common';

import type { TypeSystemUser } from '@/interface/system/user';
import type { TypeEditUserPorps } from './components/EditUser';
import { ENUM_STORE_ACTION } from '@/enum/store';

interface TypeQueryUserList extends TypeSystemUser.QueryList {
  time?: number[];
};

/**
 * @name User 用户管理
 */
const User = () => {

  const store = useStore();
  const actions = useActions();

  const { DEPARTMENT } = store.dictionary;

  const [search] = Form.useForm<TypeQueryUserList>();

  const [editParam, setEditParam] = useState<Omit<TypeEditUserPorps, 'onClose'>>({ visible: false });

  const { data, loading, run } = useRequest(getUserList, { manual: true });
  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  const onChangeEdit = useCallback((row?: TypeSystemUser.DTO) => {
    setEditParam(s => ({ visible: !s.visible, id: row?.id }));
    !row && initializa();
  }, [initializa]);

  function onChangeFreeze(data: TypeSystemUser.DTO) {
    const { id, status } = data;
    const userStatus = status === ENUM_COMMON.STATUS.FREEZE ?
      ENUM_COMMON.STATUS.ACTIVATE : ENUM_COMMON.STATUS.FREEZE;
    Modal.confirm({
      title: '您确定要执行该操作？',
      icon: <ExclamationCircleOutlined />,
      content: userStatus === ENUM_COMMON.STATUS.ACTIVATE ?
        '激活操作，将会赋予用户在本系统拥有的角色权限。' :
        '冻结操作，将会冻结该用户所有的权限（包括登陆），请谨慎操作！',
      async onOk() {
        await freezeAdminUser({ id, status: userStatus });
        message.success('操作成功');
        initializa();
      },
    });
  };

  async function resetPwd(row: TypeSystemUser.DTO) {
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
    { key: 'name', name: '用户名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
    { key: 'account', name: '登陆账号', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
    { key: 'phone', name: '联系电话', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
    {
      key: 'departmentId',
      name: '所属部门',
      type: ENUM_COMMON.COMPONENT_TYPE.SELECT,
      list: DEPARTMENT?.list
    },
    {
      key: 'status',
      name: '用户状态',
      list: CONSTANT_COMMON.LIST_STATUS,
      type: ENUM_COMMON.COMPONENT_TYPE.SELECT
    },
    { key: 'time', name: '注册时间', type: ENUM_COMMON.COMPONENT_TYPE.TIME_SCOPE },
  ], [DEPARTMENT])

  const columns = [
    { title: '用户名称', key: 'name', dataIndex: 'name' },
    { title: '登陆账号', key: 'account', dataIndex: 'account' },
    { title: '联系电话', key: 'phone', dataIndex: 'phone' },
    {
      title: '当前状态', key: 'status', dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <StatusColor status={key} />
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      width: 180,
      render: timestampToTime
    },
    {
      title: '操作', key: DB_PRIMARY_KEY,
      render: (row: TypeSystemUser.DTO) => {
        const color = row.status === ENUM_COMMON.STATUS.ACTIVATE ? 'danger' : 'success';
        return (
          <>
            <Btn onClick={() => onChangeEdit(row)}>编辑</Btn>
            <Btn onClick={() => resetPwd(row)}>重置密码</Btn>
            <Btn
              type={color} onClick={() => onChangeFreeze(row)}>
              {row.status === ENUM_COMMON.STATUS.ACTIVATE ? '冻结' : '激活'}
            </Btn>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    actions.getDictionaries(ENUM_STORE_ACTION.DICTIONARIES.ROLE);
    actions.getDictionaries(ENUM_STORE_ACTION.DICTIONARIES.DEPARTMENT);
  }, [actions]);

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
      <EditUser {...editParam} onClose={onChangeEdit} />
    </Card>
  );
};

export default User;
