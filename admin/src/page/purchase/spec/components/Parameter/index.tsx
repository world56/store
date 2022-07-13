import { useRequest } from "ahooks";
import context from '../../context';
import { Btn } from "@/layout/Button";
import Search from "@/components/Search";
import { usePageTurning } from "@/hooks";
import Categorys from "@/components/Categorys";
import { Button, Form, Table, Tooltip } from "antd";
import { getSpecParameterList } from "@/api/purchase";
import RelationCategory from "./components/RelationCategory";
import EditSpecParameter from "./components/EditSpecParameter";
import { ScheduleOutlined, FormOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState, useContext, useMemo } from "react";

import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeCommon } from "@/interface/common";
import type { TypeSpec } from "@/interface/purchase/spec";

/**
 * @name SpecParameter 产品规格参数
 */
const SpecParameter = () => {

  const { category } = useContext(context);
  const categoryData = category?.data;

  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [id, setId] = useState<TypeCommon.DatabaseMainParameter['id']>();

  const [search] = Form.useForm<TypeSpec.Query>();

  const { data, loading, run } = useRequest(getSpecParameterList, { manual: true });
  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const iniaializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  function onEdit() {
    const state = !visible;
    setVisible(state);
    if (visible) {
      iniaializa();
      setSelectedRowKeys([]);
    };
  };

  function onRowClick(row: TypeSpec.SpecParameterDTO) {
    setSelectedRowKeys(s => {
      const index = selectedRowKeys.indexOf(row.id);
      const existence = index > -1;
      existence && s.splice(index, 1);
      return existence ? [...s] : [...s, row.id];
    });
  };

  function onRelation(row?: TypeSpec.SpecParameterDTO) {
    setId(row?.id);
    row || iniaializa();
  };

  const query = useMemo(() => [
    { name: 'name', label: '规格名称', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'categoryId', label: '关联模板', type: Search.ENUM.COMP_TYPE.SELECT, list: categoryData },
  ], [categoryData]);

  const columns = [
    { key: 'name', dataIndex: 'name', title: '参数名称' },
    {
      key: 'spec',
      dataIndex: 'spec',
      title: '规格模板',
      width: 300,
      render: (val: TypeSpec.SpecParameterDTO['spec']) => (
        <Categorys.Tag list={val} maxWidth={260} />
      )
    },
    { key: 'remark', dataIndex: 'remark', title: '备注' },
    {
      key: 'id',
      width: 100,
      title: '操作',
      render: (row: TypeSpec.SpecParameterDTO) => (
        <Btn onClick={() => onRelation(row)}>所属类目</Btn>
      )
    },
  ];

  useEffect(() => {
    iniaializa();
  }, [iniaializa]);

  const disabled = !selectedRowKeys.length;

  return (
    <>
      <Search form={search} columns={query} onSearch={iniaializa}>
        <Button onClick={onEdit} icon={<ScheduleOutlined />}>新增参数</Button>
        <Tooltip title={disabled ? `批量选择参数后可进行批量编辑` : undefined}>
          <Button onClick={onEdit} icon={<FormOutlined />} disabled={disabled}>编辑参数</Button>
        </Tooltip>
      </Search>
      <Table
        loading={loading}
        columns={columns}
        pagination={pagination}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
        onRow={row => ({ onClick: () => onRowClick(row) })}
        rowSelection={{ selectedRowKeys, onChange: e => setSelectedRowKeys(e as number[]) }} />
      <RelationCategory id={id} onClose={onRelation} />
      <EditSpecParameter ids={selectedRowKeys} visible={visible} onClose={onEdit} />
    </>
  );
};

export default SpecParameter;
