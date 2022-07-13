import { Table } from 'antd';

import { DB_PRIMARY_KEY } from '@/config/db';

import type { TypeSpec } from "@/interface/purchase/spec";

interface TypeSpecParatterProps {
  data: TypeSpec.DTO;
};

const columns = [
  { key: 'name', dataIndex: 'name', title: '规格', width: 240 },
  { key: 'remark', dataIndex: 'remark', title: '备注' },
];

/**
 * @name SpecParatter 规格详情
 */
const SpecParatter: React.FC<TypeSpecParatterProps> = ({ data }) => (
  <Table
    size='small'
    columns={columns}
    pagination={false}
    rowKey={DB_PRIMARY_KEY}
    dataSource={data.parameter}
  />
);

export default SpecParatter;
