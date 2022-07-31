import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import { toTime } from '@/utils/format';
import { statusReversal } from '@/utils';
import Search from "@/components/Search";
import EditTemplate from "./EditTemplate";
import { Button, Form, Table } from "antd";
import Categorys from "@/components/Categorys";
import { Btn, StatusChange } from "@/layout/Button";
import { SpecParatter } from "@/components/Details";
import { ScheduleOutlined } from '@ant-design/icons';
import { usePageTurning, useCategorys } from "@/hooks";
import { useCallback, useEffect, useState, useMemo } from "react";
import { changeSpecTemplateStatus, getSpecTemplateList } from "@/api/purchase";

import { ENUM_COMMON } from "@/enum/common";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeSpec } from "@/interface/purchase/spec";
import type { TypeEditSpecTemplateProps } from './EditTemplate';

type TypeEditSpecTemplate = Omit<TypeEditSpecTemplateProps, 'onClose' | 'spec'>;

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name SpecTemplate 产规格管理
 */
const SpecTemplate = () => {

  const { SPEC } = useCategorys([ENUM_CATEGORY.SPEC]);

  const [search] = Form.useForm<TypeSpec.Query>();

  const [edit, setEdit] = useState<TypeEditSpecTemplate>({ visible: false });

  const { data, loading, run } = useRequest(getSpecTemplateList, {
    manual: true,
    debounceWait: 200
  });

  const pagination = usePageTurning(data?.count);
  const { pageSize, currentPage } = pagination;

  const iniaializa = useCallback(async () => {
    const values = await search.validateFields();
    values.pageSize = pageSize;
    values.currentPage = currentPage;
    run(values);
  }, [run, search, pageSize, currentPage]);

  function onEdit(row?: TypeSpec.DTO) {
    edit.visible && iniaializa();
    const visible = !edit.visible;
    setEdit({ visible, id: row?.id });
  };

  async function changeStatus({ id, status }: TypeSpec.DTO) {
    await changeSpecTemplateStatus({ id, status: statusReversal(status) });
    iniaializa();
  };

  const query = useMemo(() => [
    { name: 'name', label: '模板名称', type: Search.ENUM.COMP_TYPE.INPUT },
    { name: 'parameterId', label: '关联规格', type: Search.ENUM.COMP_TYPE.SELECT, list: SPEC?.LIST },
  ], [SPEC]);

  const columns = [
    { key: 'name', dataIndex: 'name', title: '模板名称' },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: 200,
      render: toTime
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: 100,
      render: (key: ENUM_COMMON.STATUS) => <Status status={key} />
    },
    {
      key: 'parameter',
      dataIndex: 'parameter',
      title: '规格',
      width: 300,
      render: (val: TypeSpec.DTO['parameter']) => <Categorys.Tag list={val} maxWidth={260} />
    },
    { key: 'remark', dataIndex: 'remark', title: '规格说明' },
    {
      key: 'id',
      title: '操作',
      render: (row: TypeSpec.DTO) => (
        <>
          <Btn onClick={() => onEdit(row)}>编辑</Btn>
          <StatusChange confirmTips status={row.status} onClick={() => changeStatus(row)} />
        </>
      )
    },
  ];

  useEffect(() => {
    iniaializa();
  }, [iniaializa]);

  return (
    <>
      <Search form={search} columns={query} onSearch={iniaializa}>
        <Button onClick={() => onEdit()} icon={<ScheduleOutlined />}>新增规格</Button>
      </Search>
      <Table
        loading={loading}
        columns={columns}
        pagination={pagination}
        rowKey={DB_PRIMARY_KEY}
        dataSource={data?.list}
        expandable={{ expandedRowRender: row => <SpecParatter data={row} /> }}
      />
      <EditTemplate {...edit} spec={SPEC} onClose={onEdit} />
    </>
  );
};

export default SpecTemplate;
