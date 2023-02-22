import { Input, Table } from "antd";
import { useRequest } from "ahooks";
import { Modal } from "@/layout/PopUp";
import styles from '../index.module.sass';
import Categorys from "@/components/Categorys";
import { Btn, FooterButton } from "@/layout/Button";
import { SpecParatter } from '@/components/Details';
import { getSpecTemplateList } from "@/api/purchase";
import { useCallback, useEffect, useState } from "react";

import { ENUM_COMMON } from "@/enum/common";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { TypeCommon } from "@/interface/common";
import type { TypeSpec } from "@/interface/purchase/spec";

interface TypeSelectSpecProps {
  onChange(ids: TypeCommon.DatabaseMainParameter['id'][]): void;
};

const columns = [
  { key: 'name', dataIndex: 'name', title: '模板名称' },
  {
    key: 'parameter',
    dataIndex: 'parameter',
    title: '规格',
    render: (val: TypeSpec.DTO['parameter']) => <Categorys.Tag list={val} maxWidth={260} />
  },
  { key: 'remark', dataIndex: 'remark', title: '规格说明' }
];

/**
 * @name SpecTemplate 选择产品规格模板
 */
const SpecTemplate: React.FC<TypeSelectSpecProps> = ({ onChange }) => {

  const [name, setName] = useState<string>();
  const [visible, setVisible] = useState(false);

  const [select, setSelect] = useState<TypeSpec.DTO[]>([]);

  const { data, loading, run } = useRequest(getSpecTemplateList, {
    manual: true,
    debounceWait: 200,
  });

  const initializa = useCallback(() => (
    run({ currentPage: 1, pageSize: 9999, name, status: ENUM_COMMON.STATUS.ACTIVATE })
  ), [name, run]);

  function onSubmit() {
    onChange(select.map(v => v.parameter.map(v => v.id)).flat());
    onCancel();
  };

  function onRowClick(row: TypeSpec.DTO) {
    const selectedRowKeys = select.map(v => v.id);
    setSelect(s => {
      const index = selectedRowKeys.indexOf(row.id);
      const existence = index > -1;
      existence && s.splice(index, 1);
      return existence ? [...s] : [...s, row];
    });
  };

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  };

  function onCancel() {
    const bol = !visible;
    setVisible(bol);
    if (visible) {
      setName('');
      setSelect([]);
    }
  };

  useEffect(() => {
    visible && initializa();
  }, [visible, initializa]);

  return (
    <>
      <Btn onClick={onCancel}>规格模板</Btn>
      <Modal
        open={visible}
        title='规格模板'
        onOk={onSubmit}
        onCancel={onCancel}
        className={styles.specTemplate}
        footer={<FooterButton onSubmit={onSubmit} onCancel={onCancel} onRefresh={initializa} />}>
        <Input value={name} onChange={onNameChange} placeholder="请输入模板名称" allowClear />
        <Table
          size='small'
          loading={loading}
          columns={columns}
          pagination={false}
          scroll={{ y: 700 }}
          dataSource={data?.list}
          rowKey={DB_PRIMARY_KEY}
          onRow={row => ({ onClick: () => onRowClick(row) })}
          expandable={{ expandedRowRender: row => <SpecParatter data={row} /> }}
          rowSelection={{ selectedRowKeys: select.map((v) => v.id), onChange: (e, l) => setSelect(l) }}
        />
      </Modal>
    </>
  );
};

export default SpecTemplate;
