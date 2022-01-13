import { useAsyncFn } from 'react-use';
import Search from '@/components/Search';
import { usePageTurning } from '@/hooks';
import { timestampToTime } from '@/utils';
import { Hint, Btn } from '@/layout/Table';
import EditUser from './components/EditUser';
import StatusColor from '@/layout/StatusColor';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useState, useCallback, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Form, Table, Button, Modal, message } from 'antd';
import { getUserList, freezeAdminUser, resetAdminUserPwd } from '@/api/system';

import { ENUM_COMMON } from '@/enum/common';
import { DB_PRIMARY_KEY } from '@/config/db';
import { CONSTANT_COMMON } from '@/constant/common';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemUser } from '@/interface/system/user';
import type { TypeEditUserPorps } from './components/EditUser';

const query = [
  { key: 'name', name: '用户名称', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'account', name: '登陆账号', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'phone', name: '联系电话', type: ENUM_COMMON.COMPONENT_TYPE.INPUT },
  { key: 'time', name: '注册时间', type: ENUM_COMMON.COMPONENT_TYPE.TIME_SCOPE },
  {
    key: 'status',
    name: '用户状态',
    list: CONSTANT_COMMON.LIST_STATUS,
    type: ENUM_COMMON.COMPONENT_TYPE.SELECT
  },
];

/**
 * @name User 用户管理
 */
const User = () => {

  const [search] = Form.useForm<TypeSystemUser.QueryList & TypeCommon.QueryDefaulsParam>();

  const [editParam, setEditParam] = useState<Omit<TypeEditUserPorps, 'onClose'>>({ visible: false });

  const [data, fetch] = useAsyncFn(getUserList);
  const pagination = usePageTurning(data.value?.total);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    fetch(values);
  }, [fetch, search, pageSize, currentPage]);

  const onChangeEdit = useCallback((row?: TypeSystemUser.Info) => {
    setEditParam(s => ({ visible: !s.visible, id: row?._id }));
    !row && initializa();
  }, [initializa]);

  function onChangeFreeze(data: TypeSystemUser.Info) {
    const { _id, status } = data;
    const userStatus = status === ENUM_COMMON.STATUS.FREEZE ?
      ENUM_COMMON.STATUS.ACTIVATE : ENUM_COMMON.STATUS.FREEZE;
    Modal.confirm({
      title: '您确定要执行该操作？',
      icon: <ExclamationCircleOutlined />,
      content: userStatus === ENUM_COMMON.STATUS.ACTIVATE ?
        '激活操作，将会赋予用户在本系统拥有的角色权限。' :
        '冻结操作，将会冻结该用户所有的权限（包括登陆），请谨慎操作！',
      async onOk() {
        await freezeAdminUser({ _id, status: userStatus });
        message.success('操作成功');
        initializa();
      },
    });
  };

  async function resetPwd(row: TypeSystemUser.Info) {
    Modal.confirm({
      title: '您确定要执行该操作？',
      icon: <ExclamationCircleOutlined />,
      content: '该用户密码将重置，仅用于用户忘记密码的场景',
      async onOk() {
        const { _id } = row;
        await resetAdminUserPwd({ _id });
        message.success('重置成功，重新登陆生效哦');
        initializa();
      },
    });
  };

  useEffect(() => {
    initializa();
  }, [initializa]);

  const columns = [
    { title: '用户名称', key: 'name', dataIndex: 'name' },
    { title: '登陆账号', key: 'account', dataIndex: 'account' },
    { title: '联系电话', key: 'phone', dataIndex: 'phone' },
    {
      title: '当前状态', key: 'status', dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <StatusColor status={key} />
    },
    {
      title: '角色类型',
      key: 'role',
      dataIndex: 'role',
      render: (val: TypeSystemUser.Info[]) => {
        const text = val.map(v => v.name).join('、');
        return <Hint width={100} title={text}>{text}</Hint>;
      }
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
      render: (row: TypeSystemUser.Info) => {
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

  return (
    <Card title='用户管理'>
      <Search form={search} columns={query} onSearch={initializa}>
        <Button onClick={() => onChangeEdit()}>
          新增用户 <UsergroupAddOutlined />
        </Button>
      </Search>
      <Table
        columns={columns}
        loading={data.loading}
        rowKey={DB_PRIMARY_KEY}
        pagination={pagination}
        dataSource={data.value?.list} />
      <EditUser {...editParam} onClose={onChangeEdit} />
    </Card>
  );
};

export default User;
