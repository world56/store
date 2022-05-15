import { useRequest } from "ahooks";
import Search from "@/components/Search";
import { BtnEditDel } from '@/layout/Table';
import { InboxOutlined } from '@ant-design/icons';
import StatusColors from './components/StatusColors';
import EditPosition from "./components/EditPosition";
import { Button, Card, Form, message, Table } from "antd";
import { useActions, usePageTurning, useStore } from "@/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWarehousePositionList, removeWarehousePosition } from "@/api/warehouse";

import { DB_PRIMARY_KEY } from '@/config/db';
import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeWarehousePosition } from "@/interface/warehouse/position";

/**
 * @name Position 库房仓位编排
 */
const Position = () => {

  const actions = useActions();
  const { dictionaries: { WAREHOURE_STATUS } } = useStore();

  const [search] = Form.useForm<TypeWarehousePosition.Query>();

  const [id, setId] = useState<number>();
  const [visible, setVisible] = useState(false);

  const {
    data, run, loading
  } = useRequest(getWarehousePositionList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search?.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  function onClose() {
    visible && initializa();
    setVisible(false);
    setId(undefined);
  };

  function onEdit(id: number) {
    setId(id);
    setVisible(true);
  };

  async function onRemove(id: number) {
    await removeWarehousePosition({ id });
    message.success('操作成功');
    initializa();
  };

  const query = useMemo(() => [
    { key: 'name', name: '仓位名称', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      key: 'status',
      name: "仓位状态",
      list: WAREHOURE_STATUS?.LIST,
      type: Search.ENUM.COMP_TYPE.SELECT,
    }
  ], [WAREHOURE_STATUS]);

  const columns = [
    { key: 'name', dataIndex: 'name', title: '仓位名称' },
    {
      key: 'id',
      dataIndex: 'contacts',
      title: '负责人',
      render: (row: TypeWarehousePosition.DTO['contacts']) => row.name
    },
    {
      key: 'id',
      dataIndex: 'contacts',
      title: '联系电话',
      render: (row: TypeWarehousePosition.DTO['contacts']) => row.phone
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      render: (status: number) => <StatusColors enums={WAREHOURE_STATUS} status={status} />
    },
    { key: 'remark', dataIndex: 'remark', title: '备注' },
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      dataIndex: DB_PRIMARY_KEY,
      render: (id: number) => <BtnEditDel value={id} onEdit={onEdit} onRemove={onRemove} />
    }
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  useEffect(() => {
    actions.getDictionaries(ENUM_STORE_ACTION.DICTIONARIES.ADMIN_USER);
  }, [actions]);

  return (
    <Card title='仓位管理'>
      <Search form={search} columns={query} onSearch={initializa}>
        <Button onClick={() => setVisible(true)}>
          <InboxOutlined /> 新增仓位
        </Button>
      </Search>
      <Table
        loading={loading}
        columns={columns}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
        pagination={pagination} />
      <EditPosition
        id={id}
        visible={visible}
        onClose={onClose} />
    </Card>
  );
};

export default Position;
