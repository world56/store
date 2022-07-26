import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import { Btn } from "@/layout/Button";
import Search from "@/components/Search";
import { useNavigate } from "react-router-dom";
import Categorys from "@/components/Categorys";
import { Button, Card, Form, Table } from "antd";
import EditProduct from "./components/EditProduct";
import { CodeSandboxOutlined } from '@ant-design/icons';
import { getSupplierProductList } from "@/api/purchase";
import { useActions, usePageTurning, useStore } from "@/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ENUM_STORE } from "@/enum/store";
import { ENUM_COMMON } from "@/enum/common";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeCommon } from '@/interface/common';
import type { TypeEditProductProps } from './components/EditProduct';
import type { TypeSupplierProduct } from "@/interface/purchase/product";

type TypeEditProductParam = Omit<TypeEditProductProps, 'onClose'>;

export interface TypeSupplierProductPageProps {
  supplierId?: TypeCommon.DatabaseMainParameter['id'];
};

/**
 * @name Product 采购供应产品库
 */
const Product: React.FC<TypeSupplierProductPageProps> = ({ supplierId }) => {

  const actions = useActions();
  const { category } = useStore();

  const navigate = useNavigate();

  const [search] = Form.useForm<TypeSupplierProduct.Query>();

  const [edit, setEdit] = useState<TypeEditProductParam>({ visible: false });

  const { data, loading, run } = useRequest(getSupplierProductList, { manual: true });
  const pagination = usePageTurning(data?.count);
  const { currentPage, pageSize } = pagination;

  const initializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    if (supplierId) {
      values.supplierId = supplierId;
      values.status = ENUM_COMMON.STATUS.ACTIVATE;
    }
    run(values);
  }, [run, search, pageSize, currentPage, supplierId]);

  function onEdit(row?: TypeSupplierProduct.DTO) {
    const bol = !edit.visible;
    setEdit({ visible: bol, id: row?.id });
    bol || initializa();
  };

  function skipDetails(val: TypeSupplierProduct.DTO) {
    const jump = supplierId ? window.open : navigate;
    jump(`/purchase/supplierProductDetails/${val.id}`);
  };

  const query = useMemo(() => [
    { name: 'name', label: '产品名称', type: Search.ENUM.COMP_TYPE.INPUT },
    {
      name: 'branId',
      label: '产品品牌',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PRODUCT_BRAND?.LIST
    },
    {
      name: 'status',
      label: '状态',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.STATUS?.LIST,
      hide: () => Boolean(supplierId)
    },
    {
      name: 'supplierId',
      label: '供应商',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PURCHASE_SUPPLIER?.LIST,
      hide: () => Boolean(supplierId)
    },
    {
      name: 'categoryId',
      label: '产品类目',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PURCHASE_PRODUCT_TYPE?.LIST
    },
  ], [category, supplierId]);

  const columns = [
    {
      key: 'name',
      title: '商品名称',
      render: (row: TypeSupplierProduct.DTO) => <Btn onClick={() => skipDetails(row)}>{row.name}</Btn>
    },
    {
      dataIndex: 'brand',
      title: '品牌',
      render: (row: TypeSupplierProduct.DTO['brand']) => row.name
    },
    {
      dataIndex: 'status',
      title: '状态',
      render: (status: ENUM_COMMON.STATUS) => <Status status={status} />
    },
    {
      dataIndex: 'category',
      title: '类型',
      render: (row: TypeSupplierProduct.DTO['category']) => <Categorys.Tag list={row} />
    },
    {
      key: DB_PRIMARY_KEY,
      title: '操作',
      width: 120,
      render: (row: TypeSupplierProduct.DTO) => (
        <>
          <Btn onClick={() => skipDetails(row)}>详情</Btn>
          <Btn onClick={() => onEdit(row)}>编辑</Btn>
        </>
      )
    }
  ];

  useEffect(() => {
    initializa();
  }, [initializa]);

  useEffect(() => {
    actions.getCategory([
      ENUM_STORE.CATEGORY.SPEC,
      ENUM_STORE.CATEGORY.PRODUCT_BRAND,
      ENUM_STORE.CATEGORY.WAREHOUSE_UNIT,
      ENUM_STORE.CATEGORY.PURCHASE_SUPPLIER,
      ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE
    ]);
  }, [actions]);

  return (
    <Card title={supplierId ? '产品列表' : '供应产品库'}>
      <Search form={search} columns={query} onSearch={initializa}>
        <Button onClick={() => onEdit()} icon={<CodeSandboxOutlined />}>新增产品</Button>
      </Search>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.list}
        rowKey={DB_PRIMARY_KEY}
        pagination={pagination} />
      <EditProduct {...edit} supplierId={supplierId} onClose={onEdit} />
    </Card>
  );
};

export default Product;
