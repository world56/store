import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import { Btn } from "@/layout/Button";
import Search from "@/components/Search";
import { useNavigate } from "react-router-dom";
import Categorys from "@/components/Categorys";
import { Button, Card, Form, Table } from "antd";
import EditProduct from "./components/EditProduct";
import { useCategorys, usePageTurning } from "@/hooks";
import { CodeSandboxOutlined } from '@ant-design/icons';
import { getSupplierProductList } from "@/api/purchase";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ENUM_COMMON } from "@/enum/common";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeEditProductProps } from './components/EditProduct';
import type { TypeSupplierProduct } from "@/interface/purchase/product";

type TypeEditProductParam = Omit<TypeEditProductProps, 'onClose'>;

export interface TypeSupplierProductPageProps extends Pick<TypeSupplierProduct.Query, 'supplierId'> { };

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Product 采购供应产品库
 */
const Product: React.FC<TypeSupplierProductPageProps> = ({ supplierId }) => {

  const category = useCategorys([
    ENUM_CATEGORY.SPEC,
    ENUM_CATEGORY.PRODUCT_BRAND,
    ENUM_CATEGORY.WAREHOUSE_UNIT,
    ENUM_CATEGORY.PURCHASE_SUPPLIER,
    ENUM_CATEGORY.PURCHASE_PRODUCT_TYPE
  ]);

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
    navigate(`/purchase/supplierProductDetails/${val.id}`);
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
      hide: () => Boolean(supplierId),
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.STATUS?.LIST,
    },
    {
      name: 'supplierId',
      label: '供应商',
      hide: () => Boolean(supplierId),
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.PURCHASE_SUPPLIER?.LIST,
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
