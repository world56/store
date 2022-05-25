import { useRequest } from "ahooks";
import { Btn } from "@/layout/Button";
import Search from '@/components/Search';
import Categorys from "@/components/Categorys";
import { Button, Card, Form, Table } from "antd";
import { AuditOutlined } from '@ant-design/icons';
import EditSupplier from "./components/EditSupplier";
import { getPurchaseSupplierList } from "@/api/purchase";
import { useActions, usePageTurning, useStore } from "@/hooks";
import { useCallback, useEffect, useState, useMemo } from "react";

import { ENUM_STORE } from "@/enum/store";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeCommon } from "@/interface/common";
import type { TypeEditSupplierProps } from './components/EditSupplier';
import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

type TypeEditSupplierInfo = Omit<TypeEditSupplierProps, 'onClose'>;

/**
 * @name Supplier 供应商列表
 */
const Supplier = () => {

  const actions = useActions();
  const { category: { PURCHASE_PRODUCT_TYPE } } = useStore();

  const [form] = Form.useForm<TypePurchaseSupplier.Query>();
  const [edit, setEdit] = useState<TypeEditSupplierInfo>({ visible: false });

  const { data, run, loading } = useRequest(getPurchaseSupplierList, { manual: true });

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

  const query = useMemo(() => [
    { key: 'name', name: '供应商名称', type: Search.ENUM.COMP_TYPE.INPUT },
    { key: 'contactsName', name: '联系人姓名', type: Search.ENUM.COMP_TYPE.INPUT },
    { key: 'phone', name: '联系电话', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      key: 'category',
      name: '供应类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: PURCHASE_PRODUCT_TYPE?.LIST,
    },
  ], [PURCHASE_PRODUCT_TYPE]);

  const columns = [
    { key: 'name', dataIndex: 'name', title: '供应商名称' },
    {
      key: 'type',
      dataIndex: 'type',
      title: '供应类型',
      width: 250,
      render: (val: TypeCommon.Category[]) => <Categorys.Tag list={val} />
    },
    { key: 'remark', dataIndex: 'remark', title: '备注' },
    {
      key: DB_PRIMARY_KEY,
      title: '操作',
      render: (val: TypePurchaseSupplier.DTO) => (
        <>
          <Btn onClick={() => onEdit(val)} >编辑</Btn>
          <Btn confirmTips type='danger'>冻结</Btn>
        </>
      )
    }
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  useEffect(() => {
    actions.getCategory([ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE]);
  }, [actions]);

  return (
    <Card title='供应商列表'>
      <Search form={form} columns={query} onSearch={initializa}>
        <Button
          icon={<AuditOutlined />}
          onClick={() => setEdit({ visible: true })}>
          新增供应商
        </Button>
      </Search>
      <Table loading={loading} rowKey={DB_PRIMARY_KEY} columns={columns} dataSource={data?.list} />
      <EditSupplier {...edit} onClose={onEdit} />
    </Card>
  );
};

export default Supplier;
