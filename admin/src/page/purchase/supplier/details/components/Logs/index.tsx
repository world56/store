import AddLog from "./AddLog";
import { useState } from "react";
import { useRequest } from "ahooks";
import ExtendInfo from "./ExtendInfo";
import { useCategorys } from "@/hooks";
import { toTime } from '@/utils/format';
import { Table, Select, Button } from "antd";
import styles from '../../index.module.sass';
import { SyncOutlined } from '@ant-design/icons';
import { getPurchaseSupplierLogs } from '@/api/purchase';

import { DB_PRIMARY_KEY } from "@/config/db";
import { ENUM_PURCHASE } from "@/enum/purchase";

import type { TypeCommon } from "@/interface/common";
import type { ColumnsType } from 'antd/lib/table/interface';
import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

const { Option } = Select;

export interface TypeLogsProps extends TypeCommon.DatabaseMainParameter { }

/**
 * @name Logs 供应商日志
 */
const Logs: React.FC<TypeLogsProps> = ({ id }) => {

  const { SUPPLIER_LOG_TYPE } = useCategorys();

  const [type, setType] = useState<ENUM_PURCHASE.SUPPLIER_LOG_TYPE>();

  const { data, loading, run } = useRequest(() => getPurchaseSupplierLogs({ id, type }), {
    debounceWait: 200,
    refreshDeps: [type],
  });

  const columns = [
    {
      title: '日志类型',
      width: 150,
      dataIndex: 'type',
      render: (key: ENUM_PURCHASE.SUPPLIER_LOG_TYPE) => {
        const isStatus = key === ENUM_PURCHASE.SUPPLIER_LOG_TYPE.STATUS;
        return <span className={isStatus ? 'error' : ''}>{SUPPLIER_LOG_TYPE?.OBJ[key]}</span>;
      }
    },
    {
      title: '添加日期',
      width: 200,
      dataIndex: 'createTime',
      render: (time: string) => toTime(time)
    },
    {
      title: '操作人',
      width: 180,
      dataIndex: 'user',
      render: (val: TypePurchaseSupplier.LogDTO['user']) => val.name
    },
    { title: '内容', align: 'left', ellipsis: true, dataIndex: 'content' }
  ] as ColumnsType<TypePurchaseSupplier.LogDTO>;

  return (
    <>
      <div className={styles.logsQuery}>
        <Select onChange={setType} placeholder='请选选择日志类型' allowClear>
          {SUPPLIER_LOG_TYPE?.LIST.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
        </Select>
        <AddLog id={id} initializa={run} />
        <Button onClick={run} icon={<SyncOutlined />}>更新日志</Button>
      </div>
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={DB_PRIMARY_KEY}
        expandable={{ expandedRowRender: row => <ExtendInfo data={row} /> }} />
    </>
  );
};

export default Logs;
