import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import Search from '@/components/Search';
import { useNavigate } from "react-router-dom";
import Categorys from "@/components/Categorys";
import { Button, Card, Form, Table } from "antd";
import { AuditOutlined } from '@ant-design/icons';
import ChangeStatus from "./components/EditStatus";
import { Btn, StatusChange } from "@/layout/Button";
import EditSupplier from "./components/EditSupplier";
import { useCategorys, usePageTurning } from "@/hooks";
import { getPurchaseSupplierList } from "@/api/purchase";
import { useCallback, useEffect, useState, useMemo } from "react";

import { ENUM_COMMON } from "@/enum/common";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeCommon } from "@/interface/common";
import type { TypeEditStatus } from './components/EditStatus';
import type { TypeEditSupplierProps } from './components/EditSupplier';
import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

type TypeEditStatusInfo = Omit<TypeEditStatus, 'onClose'>;
type TypeEditSupplierInfo = Omit<TypeEditSupplierProps, 'onClose'>;

const { ENUM_CATEGORY } = useCategorys;


interface TypeSupplierListProps {
  productId?: TypeCommon.DatabaseMainParameter['id'];
};

/**
 * @name SupplierList 供应商列表
 */
const SupplierList: React.FC<TypeSupplierListProps> = ({ productId }) => {

  const { STATUS, PURCHASE_PRODUCT_TYPE } = useCategorys([
    ENUM_CATEGORY.PURCHASE_PRODUCT_TYPE
  ]);

  const navigate = useNavigate();

  const [form] = Form.useForm<TypePurchaseSupplier.Query>();

  const [statusParam, setStatusParam] = useState<TypeEditStatusInfo>();
  const [edit, setEdit] = useState<TypeEditSupplierInfo>({ visible: false });

  const { data, run, loading } = useRequest(getPurchaseSupplierList, { manual: true, debounceWait: 200 });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await form.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [form, run, pageSize, currentPage]);

  async function onEdit(val?: TypePurchaseSupplier.DTO) {
    edit.visible && initializa();
    setEdit({ id: val?.id, visible: Boolean(val) });
  };

  function changeStatus(val?: TypePurchaseSupplier.DTO) {
    statusParam && initializa();
    setStatusParam(val ? { id: val.id, status: val.status } : undefined);
  };

  function onSkip(val: TypePurchaseSupplier.DTO) {
    navigate(`/purchase/supplierDetails/${val.id}`);
  };

  const query = useMemo(() => [
    {
      name: 'productId',
      label: '产品名称',
      type: Search.ENUM.COMP_TYPE.SELECT,
      initialValue: productId,
      hide: () => true
    },
    { name: 'name', label: '供应商名称', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'companyPhone', label: '供应商电话', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'category',
      label: '供应类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: PURCHASE_PRODUCT_TYPE?.LIST,
    },
    {
      name: 'status',
      label: '当前状态',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: STATUS?.LIST,
    },
    { name: 'contactsName', label: '联系人姓名', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'phone', label: '联系人电话', type: Search.ENUM.COMP_TYPE.INPUT },
  ], [PURCHASE_PRODUCT_TYPE, STATUS, productId]);

  const columns = [
    {
      key: 'name',
      title: '供应商名称',
      render: (row: TypePurchaseSupplier.DTO) => <Btn onClick={() => onSkip(row)}>{row.name}</Btn>
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: '供应类型',
      width: 250,
      render: (val: TypeCommon.Category[]) => <Categorys.Tag list={val} maxWidth={210} />
    },
    {
      title: '当前状态',
      key: 'status',
      dataIndex: 'status',
      render: (key: ENUM_COMMON.STATUS) => <Status status={key} />
    },
    { key: 'remark', dataIndex: 'remark', title: '备注' },
    {
      key: DB_PRIMARY_KEY,
      title: '操作',
      render: (row: TypePurchaseSupplier.DTO) => (
        <>
          <Btn onClick={() => onSkip(row)} >详情</Btn>
          <Btn onClick={() => onEdit(row)} >编辑</Btn>
          <StatusChange status={row.status} onClick={() => changeStatus(row)} />
        </>
      )
    }
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='供应商列表'>
      <Search form={form} columns={query} onSearch={initializa}>
        <Button
          icon={<AuditOutlined />}
          onClick={() => setEdit({ visible: true })}>
          新增供应商
        </Button>
      </Search>
      <Table
        loading={loading}
        columns={columns}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
      />
      <EditSupplier {...edit} onClose={onEdit} />
      <ChangeStatus {...statusParam} onClose={changeStatus} />
    </Card>
  );
};

export default SupplierList;
