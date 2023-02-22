import { useRequest } from "ahooks";
import { Btn } from "@/layout/Button";
import { toTime } from "@/utils/format";
import { Link } from "react-router-dom";
import Search from "@/components/Search";
import Switch from '@/components/Status/Switch';
import { useCategorys, usePageTurning } from "@/hooks";
import { MoneyCollectOutlined } from '@ant-design/icons';
import EditSupplierCollectionAccount from "./components";
import { Button, Card, Form, Table, message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { changeCollectionAccountStatus, getCollectionAccountList } from "@/api/finance";

import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeSupplierProduct } from "@/interface/purchase/product";
import type { TypeEditSupplierCollectionAccountProps } from './components';
import type { TypeFinancePaymentAccount } from "@/interface/finance/account";

export interface TypePatmentAccountPageProps extends Pick<TypeSupplierProduct.Query, 'supplierId'> { };

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name PaymentAccount 供应商收款账户
 * @description 供应商收款账户管理列表
 */
const PaymentAccount: React.FC<TypePatmentAccountPageProps> = ({ supplierId }) => {

  const { BANK, PURCHASE_SUPPLIER } = useCategorys([
    ENUM_CATEGORY.BANK,
    ENUM_CATEGORY.PURCHASE_SUPPLIER
  ]);

  const [edit, setEdit] = useState<Omit<TypeEditSupplierCollectionAccountProps, 'onClose'>>();

  const [search] = Form.useForm<TypeFinancePaymentAccount.Query>();

  const { data, loading, run } = useRequest(getCollectionAccountList, { manual: true });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [search, pageSize, currentPage, run]);

  function onEditSupplierAccount(row?: TypeFinancePaymentAccount.DTO) {
    setEdit(s => ({ id: row?.id, open: !s?.open }));
    row || initializa();
  };

  async function onAccountStatusChange(row: TypeFinancePaymentAccount.DTO) {
    const { id, status } = row;
    await changeCollectionAccountStatus({ id, status: Number(!status) });
    message.success('操作成功');
    initializa();
  };

  const query = useMemo(() => [
    { name: 'accountName', label: '收款人名', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'accountNumber', label: '收款账号', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'organizationId',
      label: '账户类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: BANK?.LIST,
      user: Search.ENUM.COMP_TYPE.SELECT,
    },
    {
      name: 'supplierId',
      label: '供应商',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: PURCHASE_SUPPLIER?.LIST,
      hide: () => Boolean(supplierId),
      initialValue: supplierId
    }
  ], [BANK, PURCHASE_SUPPLIER, supplierId]);

  const columns = [
    {
      dataIndex: 'supplier',
      title: '供应商名称',
      render: (row: TypeFinancePaymentAccount.DTO['supplier']) => (
        supplierId ? row.name : <Link to={`/purchase/supplierDetails/${row.id}`}>{row.name}</Link>
      )
    },
    {
      dataIndex: 'organizationId',
      title: '账户类型',
      render: (id: TypeFinancePaymentAccount.DTO['organizationId']) => BANK?.OBJ[id].name
    },
    { dataIndex: 'accountName', title: '收款人名称' },
    { dataIndex: 'accountNumber', title: '收款人账号' },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      width: 220,
      render: (time: Date) => toTime(time)
    },
    {
      key: 'id',
      title: <Switch.Title title='冻结后无法选择对应账户进行记录' />,
      render: (row: TypeFinancePaymentAccount.DTO) => (
        <Switch checked={row.status} onChange={() => onAccountStatusChange(row)} />
      )
    },
    {
      key: 'id',
      title: '操作',
      width: 150,
      render: (row: TypeFinancePaymentAccount.DTO) => <>
        <Btn onClick={() => onEditSupplierAccount(row)}>编辑</Btn>
        <Btn>付款记录</Btn>
      </>
    },
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  return (
    <Card title='供应商收款账户'>
      <Search form={search} onSearch={initializa} columns={query}>
        <Button onClick={() => onEditSupplierAccount()}>
          <MoneyCollectOutlined /> 新增供应商收款账户
        </Button>
      </Search>
      <Table
        loading={loading}
        columns={columns}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
        pagination={pagination}
      />
      <EditSupplierCollectionAccount
        {...edit}
        supplierId={supplierId}
        onClose={onEditSupplierAccount}
      />
    </Card>
  );
};

export default PaymentAccount;
