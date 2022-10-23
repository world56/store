import { useRequest } from "ahooks";
import { Card, Form, Table } from "antd";
import Search from "@/components/Search";
import { useCategorys, usePageTurning } from "@/hooks";
import { useCallback, useEffect, useMemo } from "react";
import { getWarehouseAuditList } from "@/api/warehouse";

import type { TypeWarehousingAudit } from "@/interface/warehouse/audit";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name WarehousingAudit 入库神审核
 */
const WarehousingAudit = () => {

  const {
    ADMIN_USER,
    WAREHOUSE_AUDIT_TYPE,
    WAREHOUSE_AUDIT_STATUS,
  } = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

  const [search] = Form.useForm<TypeWarehousingAudit.Query>();

  const { data, loading, run } = useRequest(getWarehouseAuditList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  const query = useMemo(() => [
    { name: 'seq', label: '流水号', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'type',
      label: '审核类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: WAREHOUSE_AUDIT_TYPE.LIST
    },
    {
      name: 'status',
      label: '审核状态',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: WAREHOUSE_AUDIT_STATUS.LIST
    },
    {
      name: 'operatorId',
      label: '操作人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: ADMIN_USER?.LIST,
    },
    { name: 'createTime', label: '创建时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
    { name: 'auditTime', label: '审核时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
  ], [WAREHOUSE_AUDIT_STATUS, WAREHOUSE_AUDIT_TYPE, ADMIN_USER]);

  const columns = useMemo(() => [
    { dataIndex: 'seq', title: '流水号' },
    {
      dataIndex: 'type',
      title: '审核类型',
      render: (type: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE) => WAREHOUSE_AUDIT_TYPE.OBJ[type]
    },
    {
      dataIndex: 'status',
      title: '审核状态',
      render: (status: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE) => WAREHOUSE_AUDIT_STATUS.OBJ[status]
    },
    { dataIndex: 'id', title: '关联流水号' },
    { dataIndex: 'createTime', title: '创建时间' },
    { dataIndex: 'auditTime', title: '审核时间' },
    { dataIndex: 'operatorId', title: '操作人' },
  ], [WAREHOUSE_AUDIT_STATUS, WAREHOUSE_AUDIT_TYPE]);

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='入库审核'>
      <Search form={search} columns={query} onSearch={initializa} />
      <Table
        columns={columns}
        loading={loading}
        dataSource={data?.list}
        pagination={pagination} />
    </Card>
  );
};

export default WarehousingAudit;
