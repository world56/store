import { useRequest } from "ahooks";
import { Btn } from "@/layout/Button";
import { toTime } from '@/utils/format';
import { Card, Form, Table } from "antd";
import Search from "@/components/Search";
import { Status } from '@/components/Status';
import { PurchaseOrder } from "@/components/Details";
import { useCategorys, usePageTurning } from "@/hooks";
import AuditBusiness from "./components/AuditBusiness";
import { getWarehouseAuditList } from "@/api/warehouse";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DB_PRIMARY_KEY } from "@/config/db";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "@/interface/common";
import type { TypeAdminUser } from "@/interface/system/user";
import type { TypeWarehousingAudit } from "@/interface/warehouse/audit";

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name WarehousingAudit 入库审核
 */
const WarehousingAudit = () => {

  const {
    ADMIN_USER,
    WAREHOUSE_AUDIT_TYPE,
    WAREHOUSING_AUDIT_STATUS,
  } = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

  const [search] = Form.useForm<TypeWarehousingAudit.Query>();

  const [warehouseOrderId, setWarehouseOrderId] = useState<TypeCommon.PrimaryKey>();

  const { data, loading, run } = useRequest(getWarehouseAuditList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  const onAudit = useCallback((row?: TypeWarehousingAudit.DTO) => {
    setWarehouseOrderId(row?.warehousing?.id);
    row || initializa();
  }, [initializa]);

  const query = useMemo(() => [
    { name: 'no', label: '流水号', type: Search.ENUM.COMP_TYPE.INPUT },
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
      list: WAREHOUSING_AUDIT_STATUS.LIST
    },
    {
      name: 'operatorId',
      label: '操作人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: ADMIN_USER?.LIST,
    },
    { name: 'createTime', label: '创建时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
    { name: 'auditTime', label: '审核时间', type: Search.ENUM.COMP_TYPE.TIME_SCOPE },
  ], [WAREHOUSING_AUDIT_STATUS, WAREHOUSE_AUDIT_TYPE, ADMIN_USER]);

  const columns = useMemo(() => [
    {
      key: DB_PRIMARY_KEY,
      title: '关联流水号',
      render: (row: TypeWarehousingAudit.DTO) => (
        <Btn onClick={() => onAudit(row)}>{row?.warehousing.no}</Btn>
      )
    },
    {
      dataIndex: 'type',
      title: '审核类型',
      render: (type: TypeWarehousingAudit.DTO['type']) => WAREHOUSE_AUDIT_TYPE.OBJ[type].name
    },
    {
      dataIndex: 'status',
      title: '审核状态',
      render: (status: TypeWarehousingAudit.DTO['status']) => (
        <Status status={status} matching={WAREHOUSING_AUDIT_STATUS.OBJ} />
      )
    },
    { dataIndex: 'createTime', title: '创建时间', width: 180, render: toTime },
    { dataIndex: 'auditTime', title: '审核时间', width: 180, render: toTime },
    {
      dataIndex: 'operatorId',
      title: '操作人',
      render: (user: TypeAdminUser.DTO) => user?.name || '-'
    },
    {
      title: '操作',
      key: DB_PRIMARY_KEY,
      render: (row: TypeWarehousingAudit.DTO) => {
        const audit = row.status === ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.PENDING;
        return <>
          {audit ? <Btn onClick={() => onAudit(row)}>审批</Btn> : null}
          <Btn onClick={() => onAudit(row)}>详情</Btn>
        </>
      }
    }
  ], [WAREHOUSING_AUDIT_STATUS, WAREHOUSE_AUDIT_TYPE, onAudit]);

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='库存审核'>
      <Search form={search} columns={query} onSearch={initializa} />
      <Table
        columns={columns}
        loading={loading}
        dataSource={data?.list}
        rowKey={DB_PRIMARY_KEY}
        pagination={pagination} />
      <PurchaseOrder onClose={onAudit} id={warehouseOrderId}>
        <AuditBusiness id={warehouseOrderId} onSubmitted={onAudit} />
      </PurchaseOrder>
    </Card>
  );
};

export default WarehousingAudit;
